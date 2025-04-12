import React, { useState } from 'react'
import styles from './TreeNode.module.scss'
import useTreeNodeService from '../hooks/useTreeNodeService'
import { NodeModel } from '../models/node.model'
import { TreeNodeEdit } from './TreeNodeEdit'
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
  depth?: number
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, parentNode, depth = 0 }) => {
  const {
    isEditing,
    inputType,
    setInputType,
    handleSaveNode,
    handleCancelNode,
    handleAddNode,
    handleDeleteNode,
    editingNodeId,
    setEditingNodeId,
    treeArray,
    setTreeArray,
    nodeTypeSelect,
    setNodeTypeSelect,
    childTypeSelector,
  } = useTreeNodeService(node)
  const [isHover, setIsHover] = useState(false)

  const indentationStyle = (depth: number) => {
    return depth > 0 ? { paddingLeft: `${depth * 5}px` } : undefined
  }
  return (
    <li className={styles.treeNodeContainer} style={indentationStyle(depth)}>
      <div
        className={isHover && !isEditing ? styles.treeNodeHover : ''}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isEditing ? (
          <TreeNodeEdit
            nodeIcon={node.type === 'folder' ? folderIcon : fileIcon}
            nodeName={node.name || ''}
            onSave={handleSaveNode}
            onCancel={handleCancelNode}
          />
        ) : (
          <div className={styles.hoverContainer}>
            {node.type === 'folder' ? (
              <img src={folderIcon} alt="folder" className={styles.icon} />
            ) : (
              <img src={fileIcon} alt="file" className={styles.icon} />
            )}
            {node.name}
            {isHover && !editingNodeId && (
              <div className={styles.actionBtnContainer}>
                <button
                  className={styles.actionBtnRound}
                  onClick={handleAddNode}
                >
                  <img src={addIconDark} alt="add" />
                </button>
                <button className={styles.actionBtnRound}>
                  <img src={deleteIconDark} alt="delete" />
                </button>
              </div>
            )}
            {nodeTypeSelect === node.id && (
              <div style={indentationStyle(depth)}>
                <button onClick={() => childTypeSelector('folder')}>
                  Folder
                </button>
                <button onClick={() => childTypeSelector('file')}>File</button>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default TreeNode
