import React, { useState } from 'react'
import TreeNode from '../components/TreeNode'

const useTreeNodeService = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputType, setInputType] = useState<string | null>('')
  const handleSaveNode = () => {}
  const handleCancelNode = () => {}
  return {
    inputValue,
    setInputValue,
    inputType,
    setInputType,
    handleSaveNode,
    handleCancelNode,
  }
}

export default useTreeNodeService
