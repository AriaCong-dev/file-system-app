import React, { createContext, ReactNode, useState, useContext } from 'react'
import { NodeModel } from '../models/node.model'

// props in the contexts to share to the all components in the provider
interface TreeContextProps {
  treeArray: NodeModel[]
  setTreeArray: React.Dispatch<React.SetStateAction<NodeModel[]>>
  editingNodeId: string | null
  setEditingNodeId: React.Dispatch<React.SetStateAction<string | null>>
  draggingNode: NodeModel | null
  setDraggingNode: React.Dispatch<React.SetStateAction<NodeModel | null>>
  draggingNodeParentNode: NodeModel | null
  setDraggingNodeParentNode: React.Dispatch<
    React.SetStateAction<NodeModel | null>
  >
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}
// 1. create context and define the init value
export const TreeContext = createContext<TreeContextProps | undefined>(
  undefined
)
// 2. create provider
export const TreeContextProvider = ({ children }: { children: ReactNode }) => {
  // state to manage the tree array
  const [treeArray, setTreeArray] = useState<NodeModel[]>([])
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [draggingNode, setDraggingNode] = useState<NodeModel | null>(null)
  const [draggingNodeParentNode, setDraggingNodeParentNode] =
    useState<NodeModel | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  return (
    <TreeContext.Provider
      value={{
        treeArray,
        setTreeArray,
        editingNodeId,
        setEditingNodeId,
        draggingNode,
        setDraggingNode,
        draggingNodeParentNode,
        setDraggingNodeParentNode,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </TreeContext.Provider>
  )
}
// 3. create custom hook to use the context
export const useTreeContext = () => {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error('useTreeContext must be used within a TreeContextProvider')
  }
  return context
}
