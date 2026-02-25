import { useState, useCallback } from "react";

/**
 * Hook for managing post composer state.
 * @returns {object}
 */
export function usePostComposer() {
  const INITIAL_STATE = {
    title: "",
    community: "",
    blocks: [],
    activeTab: "text",
    isSubmitting: false,
    errors: {},
  };

  const [state, setState] = useState(INITIAL_STATE);

  const setTitle = useCallback((title) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  const setCommunity = useCallback((community) => {
    setState((prev) => ({ ...prev, community }));
  }, []);

  const setActiveTab = useCallback((tab) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  }, []);

  const addBlock = useCallback((block) => {
    setState((prev) => ({ ...prev, blocks: [...prev.blocks, block] }));
  }, []);

  const updateBlock = useCallback((index, updates) => {
    setState((prev) => {
      const blocks = [...prev.blocks];
      blocks[index] = { ...blocks[index], ...updates };
      return { ...prev, blocks };
    });
  }, []);

  const removeBlock = useCallback((index) => {
    setState((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index),
    }));
  }, []);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  const validate = useCallback(() => {
    const errors = {};
    if (!state.title.trim()) errors.title = "Title is required";
    if (!state.community.trim()) errors.community = "Community is required";
    if (state.blocks.length === 0)
      errors.blocks = "Add at least one content block";
    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [state.title, state.community, state.blocks.length]);

  return {
    ...state,
    setTitle,
    setCommunity,
    setActiveTab,
    addBlock,
    updateBlock,
    removeBlock,
    reset,
    validate,
  };
}
