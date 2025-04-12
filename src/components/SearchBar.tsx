import React from 'react'
import styles from './SearchBar.module.scss'
import { useTreeContext } from '../contexts/TreeContext'
const SearchBar: React.FC = () => {
  const { treeArray, setTreeArray, editingNodeId, setEditingNodeId } =
    useTreeContext()

  return <div></div>
}

export default SearchBar
