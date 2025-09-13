import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import customerApi from '../../shared/services/customerApi';

const useProfileStore = create(
  persist(
    (set, get) => ({
      profile: null,
      addresses: [],
      loading: false,
      error: null,

      // Fetch profile
      fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.getProfile();
          set({ 
            profile: response.profile,
            loading: false
          });
          return response.profile;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to fetch profile',
            loading: false
          });
          return null;
        }
      },

      // Update profile
      updateProfile: async (profileData) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.updateProfile(profileData);
          set({ 
            profile: response.profile,
            loading: false
          });
          return response.profile;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to update profile',
            loading: false
          });
          return null;
        }
      },

      // Fetch addresses
      fetchAddresses: async () => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.getAddresses();
          set({ 
            addresses: response.addresses,
            loading: false
          });
          return response.addresses;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to fetch addresses',
            loading: false
          });
          return null;
        }
      },

      // Create address
      createAddress: async (addressData) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.createAddress(addressData);
          set(state => ({
            addresses: [...state.addresses, response.address],
            loading: false
          }));
          return response.address;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to create address',
            loading: false
          });
          return null;
        }
      },

      // Update address
      updateAddress: async (id, addressData) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.updateAddress(id, addressData);
          set(state => ({
            addresses: state.addresses.map(address => 
              address.id === id ? response.address : address
            ),
            loading: false
          }));
          return response.address;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to update address',
            loading: false
          });
          return null;
        }
      },

      // Delete address
      deleteAddress: async (id) => {
        set({ loading: true, error: null });
        try {
          await customerApi.deleteAddress(id);
          set(state => ({
            addresses: state.addresses.filter(address => address.id !== id),
            loading: false
          }));
          return true;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to delete address',
            loading: false
          });
          return false;
        }
      },

      // Set default address
      setDefaultAddress: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await customerApi.setDefaultAddress(id);
          set(state => ({
            addresses: state.addresses.map(address => ({
              ...address,
              isDefault: address.id === id
            })),
            loading: false
          }));
          return response;
        } catch (error) {
          set({ 
            error: error.message || 'Failed to set default address',
            loading: false
          });
          return null;
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'customer-profile-storage',
      partialize: (state) => ({ 
        profile: state.profile,
        addresses: state.addresses
      }),
    }
  )
);

export default useProfileStore;