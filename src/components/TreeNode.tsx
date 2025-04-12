import React, { useState } from 'react'
import styles from './TreeNode.module.scss'
import useTreeNodeService from '../hooks/useTreeNodeService'
import { NodeModel } from '../models/node.model'
import folderIcon from '../assets/folder-open-regular.svg'
import fileIcon from '../assets/file-regular.svg'
import yesIconDark from '../assets/check-dark.svg'
import noIconLight from '../assets/xmark-light.svg'
import addIconDark from '../assets/plus-dark.svg'
import deleteIconDark from '../assets/trash-dark.svg'
// the idea is that TreeNode renders one node, and if it has children, it can recursively render more TreeNodes from within
interface TreeNodeProps {
  node: NodeModel // it is a single node not an array of nodes
  parentNode?: NodeModel
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, parentNode }) => {
  const {
    inputValue,
    setInputValue,
    inputType,
    setInputType,
    handleSaveNode,
    handleCancelNode,
  } = useTreeNodeService()
  return (
    <li className={styles.treeNodeInputContainer}>
      <img
        className={styles.icon}
        src={inputType === 'folder' ? folderIcon : fileIcon}
        alt={inputType === 'folder' ? 'folderIcon' : 'fileIcon'}
      />
      <input
        autoFocus
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.darkButton} onClick={handleSaveNode}>
        <img src={yesIconDark} alt="yes" className={styles.icon} />
      </button>
      <button className={styles.lightButton} onClick={handleCancelNode}>
        <img src={noIconLight} alt="no" className={styles.icon} />
      </button>
    </li>
  )
}

export default TreeNode
