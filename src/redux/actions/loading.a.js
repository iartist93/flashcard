export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_LOADING = 'SET_LOADING';

//-----------------------------------------------------

export const toggleLoading = () => ({
  type: TOGGLE_LOADING,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

//-----------------------------------------------------
