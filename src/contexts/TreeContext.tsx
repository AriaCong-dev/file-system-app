import React, { createContext, ReactNode, useState } from 'react'
import { NodeModel } from '../models/node.model'

// props in the contexts to share to the all components in the provider
interface TreeContextProps {
  treeArray: NodeModel[]
  setTreeArray: React.Dispatch<React.SetStateAction<NodeModel[]>>
  editingNodeId: string | null
  setEditingNodeId: React.Dispatch<React.SetStateAction<string | null>>
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
  return (
    <TreeContext.Provider
      value={{
        treeArray,
        setTreeArray,
        editingNodeId,
        setEditingNodeId,
      }}
    >
      {children}
    </TreeContext.Provider>
  )
}

// 3. create consumer
