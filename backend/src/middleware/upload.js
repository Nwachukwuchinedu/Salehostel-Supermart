const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');
const { createBusinessError } = require('./errorHandler');

// Cloudinary storage configuration
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'saleshostel',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [
      { width: 800, height: 600, crop: 'limit', quality: 'auto' },
      { fetch_format: 'auto' }
    ],
  },
});

// Local storage configuration (for development/backup)
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create multer instances
const uploadToCloudinary = multer({
  storage: cloudinaryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});

const uploadToLocal = multer({
  storage: localStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});

// Choose storage based on environment
const upload = process.env.NODE_ENV === 'production' ? uploadToCloudinary : uploadToLocal;

// Middleware for single image upload
const uploadSingle = (fieldName = 'image') => {
  return (req, res, next) => {
    const singleUpload = upload.single(fieldName);
    
    singleUpload(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          switch (err.code) {
            case 'LIMIT_FILE_SIZE':
              return next(createBusinessError('File too large. Maximum size is 5MB.', 400, 'FILE_TOO_LARGE'));
            case 'LIMIT_UNEXPECTED_FILE':
              return next(createBusinessError('Unexpected file field.', 400, 'UNEXPECTED_FILE'));
            default:
              return next(createBusinessError('File upload error.', 400, 'UPLOAD_ERROR'));
          }
        }
        
        if (err.message === 'Only image files are allowed!') {
          return next(createBusinessError('Only image files are allowed!', 400, 'INVALID_FILE_TYPE'));
        }
        
        return next(err);
      }
      
      next();
    });
  };
};

// Middleware for multiple image upload
const uploadMultiple = (fieldName = 'images', maxCount = 5) => {
  return (req, res, next) => {
    const multipleUpload = upload.array(fieldName, maxCount);
    
    multipleUpload(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          switch (err.code) {
            case 'LIMIT_FILE_SIZE':
              return next(createBusinessError('One or more files are too large. Maximum size is 5MB per file.', 400, 'FILE_TOO_LARGE'));
            case 'LIMIT_UNEXPECTED_FILE':
              return next(createBusinessError(`Too many files. Maximum ${maxCount} files allowed.`, 400, 'TOO_MANY_FILES'));
            default:
              return next(createBusinessError('File upload error.', 400, 'UPLOAD_ERROR'));
          }
        }
        
        if (err.message === 'Only image files are allowed!') {
          return next(createBusinessError('Only image files are allowed!', 400, 'INVALID_FILE_TYPE'));
        }
        
        return next(err);
      }
      
      next();
    });
  };
};

// Middleware for mixed file uploads (different field names)
const uploadFields = (fields) => {
  return (req, res, next) => {
    const fieldsUpload = upload.fields(fields);
    
    fieldsUpload(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          switch (err.code) {
            case 'LIMIT_FILE_SIZE':
              return next(createBusinessError('One or more files are too large. Maximum size is 5MB per file.', 400, 'FILE_TOO_LARGE'));
            case 'LIMIT_UNEXPECTED_FILE':
              return next(createBusinessError('Unexpected file field or too many files.', 400, 'UNEXPECTED_FILE'));
            default:
              return next(createBusinessError('File upload error.', 400, 'UPLOAD_ERROR'));
          }
        }
        
        if (err.message === 'Only image files are allowed!') {
          return next(createBusinessError('Only image files are allowed!', 400, 'INVALID_FILE_TYPE'));
        }
        
        return next(err);
      }
      
      next();
    });
  };
};

// Middleware to process uploaded files and add to request
const processUploadedFiles = (req, res, next) => {
  try {
    // Single file upload
    if (req.file) {
      req.uploadedFile = {
        url: req.file.path || req.file.location,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      };
    }
    
    // Multiple files upload
    if (req.files && Array.isArray(req.files)) {
      req.uploadedFiles = req.files.map(file => ({
        url: file.path || file.location,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      }));
    }
    
    // Fields upload
    if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
      req.uploadedFiles = {};
      
      Object.keys(req.files).forEach(fieldName => {
        req.uploadedFiles[fieldName] = req.files[fieldName].map(file => ({
          url: file.path || file.location,
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          mimetype: file.mimetype
        }));
      });
    }
    
    next();
  } catch (error) {
    next(createBusinessError('Error processing uploaded files.', 500, 'FILE_PROCESSING_ERROR'));
  }
};

// Middleware to validate image dimensions (optional)
const validateImageDimensions = (minWidth = 100, minHeight = 100, maxWidth = 2000, maxHeight = 2000) => {
  return async (req, res, next) => {
    try {
      if (!req.file && !req.files) {
        return next();
      }
      
      const sharp = require('sharp');
      const files = req.files ? (Array.isArray(req.files) ? req.files : [req.file]) : [req.file];
      
      for (const file of files) {
        if (file && file.buffer) {
          const metadata = await sharp(file.buffer).metadata();
          
          if (metadata.width < minWidth || metadata.height < minHeight) {
            return next(createBusinessError(
              `Image dimensions too small. Minimum size is ${minWidth}x${minHeight}px.`,
              400,
              'IMAGE_TOO_SMALL'
            ));
          }
          
          if (metadata.width > maxWidth || metadata.height > maxHeight) {
            return next(createBusinessError(
              `Image dimensions too large. Maximum size is ${maxWidth}x${maxHeight}px.`,
              400,
              'IMAGE_TOO_LARGE'
            ));
          }
        }
      }
      
      next();
    } catch (error) {
      next(createBusinessError('Error validating image dimensions.', 500, 'IMAGE_VALIDATION_ERROR'));
    }
  };
};

// Middleware to compress images (optional)
const compressImages = (quality = 80) => {
  return async (req, res, next) => {
    try {
      if (!req.file && !req.files) {
        return next();
      }
      
      const sharp = require('sharp');
      const files = req.files ? (Array.isArray(req.files) ? req.files : [req.file]) : [req.file];
      
      for (const file of files) {
        if (file && file.buffer) {
          const compressedBuffer = await sharp(file.buffer)
            .jpeg({ quality })
            .toBuffer();
          
          file.buffer = compressedBuffer;
          file.size = compressedBuffer.length;
        }
      }
      
      next();
    } catch (error) {
      next(createBusinessError('Error compressing images.', 500, 'IMAGE_COMPRESSION_ERROR'));
    }
  };
};

// Helper function to delete uploaded file (for cleanup on error)
const deleteUploadedFile = async (filePath) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      // Delete from Cloudinary
      const publicId = filePath.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`saleshostel/${publicId}`);
    } else {
      // Delete from local storage
      const fs = require('fs').promises;
      await fs.unlink(filePath);
    }
  } catch (error) {
    console.error('Error deleting uploaded file:', error);
  }
};

// Middleware to cleanup files on error
const cleanupOnError = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // If there's an error status code, cleanup uploaded files
    if (res.statusCode >= 400) {
      const filesToCleanup = [];
      
      if (req.file) {
        filesToCleanup.push(req.file.path || req.file.location);
      }
      
      if (req.files) {
        if (Array.isArray(req.files)) {
          req.files.forEach(file => {
            filesToCleanup.push(file.path || file.location);
          });
        } else if (typeof req.files === 'object') {
          Object.values(req.files).forEach(fileArray => {
            fileArray.forEach(file => {
              filesToCleanup.push(file.path || file.location);
            });
          });
        }
      }
      
      // Cleanup files asynchronously
      filesToCleanup.forEach(filePath => {
        deleteUploadedFile(filePath).catch(console.error);
      });
    }
    
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  processUploadedFiles,
  validateImageDimensions,
  compressImages,
  deleteUploadedFile,
  cleanupOnError
};