import React from 'react'
import styles from './TreeView.module.scss'
import TreeNode from './TreeNode'
import { NodeModel } from '../models/node.model'

const TreeView: React.FC = () => {
  // mock data for root nodes
  const rootNodes: NodeModel[] = [
    { name: 'Root', type: 'file', id: '1', children: [] },
    { name: 'Root', type: 'folder', id: '1', children: [] },
  ]

  const handleAddToRoot = () => {}
  return (
    <div className={styles.treeViewContainer}>
      <button className={styles.addButton} onClick={handleAddToRoot}>
        Add to Root
      </button>
      <div>
        <ul>
          {rootNodes.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TreeView
