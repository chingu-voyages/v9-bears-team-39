import React, { useReducer } from 'react';
import axios from 'axios';
import WikiContext from './wikiContext';
import wikiReducer from './wikiReducer';
import {
  GET_WIKIS,
  ADD_WIKI,
  UPDATE_WIKI,
  DELETE_WIKI,
  SET_CURRENT,
  CLEAR_CURRENT,
  WIKI_ERROR,
} from '../types';

const WikiState = props => {
  const initialState = {
    current: null,
    wikis: null,
    error: null,
  };
  const [state, dispatch] = useReducer(wikiReducer, initialState);

  // Get Wikis
  const getWikis = async userid => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROVIDER}api/wikis/${userid}`
      );

      dispatch({
        type: GET_WIKIS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: WIKI_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Add New Wiki

  const addWiki = async wiki => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PROVIDER}api/wikis`,
        wiki,
        config
      );

      dispatch({
        type: ADD_WIKI,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: WIKI_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Delete a Wiki

  const deleteWiki = async userid => {
    try {
      await axios.delete(`/api/wikis/${userid}`);

      dispatch({
        type: DELETE_WIKI,
        payload: userid,
      });
    } catch (err) {
      dispatch({
        type: WIKI_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Wiki

  const updateWiki = async wiki => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/wikis/${wiki._id}`, wiki, config);
      console.log(res);
      dispatch({
        type: UPDATE_WIKI,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: WIKI_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Set Current Wiki
  const setCurrent = wikis => {
    dispatch({ type: SET_CURRENT, payload: wikis });
  };

  // Clear Current Wiki
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <WikiContext.Provider
      value={{
        wikis: state.wikis,
        current: state.current,
        setCurrent,
        getWikis,
        addWiki,
        deleteWiki,
        updateWiki,
        clearCurrent,
        error: state.error,
      }}
    >
      {children}
    </WikiContext.Provider>
  );
};

export default WikiState;
