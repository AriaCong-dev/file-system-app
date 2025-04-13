import { useState } from 'react'
import TreeNode from '../components/TreeNode'
import { useTreeContext } from '../contexts/TreeContext'
import { NodeModel } from '../models/node.model'

const useTreeNodeService = (node: NodeModel, parentNode?: NodeModel) => {
  const { treeArray, setTreeArray, editingNodeId, setEditingNodeId } =
    useTreeContext()
  const [inputType, setInputType] = useState<string | null>('')
  const [nodeTypeSelect, setNodeTypeSelect] = useState<string | null>(null)

  const isEditing = editingNodeId === node.id

  const isNotValid = (inputValue: string): boolean => {
    return inputValue.trim().includes(' ') || inputValue.trim() === ''
  }

  const handleSaveNode = (inputValue: string) => {
    if (isNotValid(inputValue)) {
      alert('Invalid input')
      return
    }
    node.name = inputValue.trim()
    setEditingNodeId(null)
    setTreeArray((prev) => [...prev])
  }
  const handleCancelNode = () => {
    setEditingNodeId(null)
  }
  const handleAddNode = () => {
    setNodeTypeSelect(node.id)
  }

  // // delete from parent's children
  // if not delete from the root level of the tree array
  const handleDeleteNode = () => {
    console.log('delete node', node.name)
    console.log('parent node', parentNode?.name)
    if (parentNode) {
      parentNode.children = parentNode.children?.filter(
        (child) => child.id !== node.id
      )
      console.log('parent node children', parentNode.children)
      setTreeArray((prev) => [...prev])
    } else {
      const newTreeArray = treeArray.filter((child) => child.id !== node.id)
      setTreeArray(newTreeArray)
    }
    setEditingNodeId(null)
  }
  const handleEditNode = () => {}

  const childTypeSelector = (nodeType: 'file' | 'folder') => {
    const newNode: NodeModel = {
      id: Date.now().toString(),
      name: '',
      type: nodeType,
      children: nodeType === 'folder' ? [] : undefined,
    }
    node.children = [...(node.children || []), newNode]
    setTreeArray((prev) => [...prev]) // trigger rerndering
    setEditingNodeId(newNode.id)
    setNodeTypeSelect(null)
  }

  return {
    isEditing,
    treeArray,
    setTreeArray,
    editingNodeId,
    setEditingNodeId,
    inputType,
    setInputType,
    handleSaveNode,
    handleCancelNode,
    handleAddNode,
    handleDeleteNode,
    nodeTypeSelect,
    setNodeTypeSelect,
    childTypeSelector,
  }
}

export default useTreeNodeService
