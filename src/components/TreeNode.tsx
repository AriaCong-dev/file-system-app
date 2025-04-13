import { useState } from 'react'
import styles from './TreeNode.module.scss'
import useTreeNodeService from '../hooks/useTreeNodeService'
import { NodeModel } from '../models/node.model'
import { TreeNodeEdit } from './TreeNodeEdit'
import folderIcon from '../assets/folder-open-regular.svg'
import fileIcon from '../assets/file-regular.svg'
import addIconDark from '../assets/plus-dark.svg'
import deleteIconDark from '../assets/trash-dark.svg'
import addIconLight from '../assets/plus-light.svg'
// the idea is that TreeNode renders one node, and if it has children, it can recursively render more TreeNodes from within
interface TreeNodeProps {
  node: NodeModel // it is a single node not an array of nodes
  parentNode?: NodeModel
  depth?: number
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, parentNode, depth = 0 }) => {
  const {
    handleSaveNode,
    handleDeleteOrCancelNode,
    handleAddNode,
    editingNodeId,
    nodeTypeSelect,
    childTypeSelector,
  } = useTreeNodeService(node, parentNode)
  const [isHover, setIsHover] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const handleDoubleClick = () => {
    setIsExpanded((prev) => !prev) // Toggle the state
  }

  const indentationStyle = (depth: number) => {
    return depth > 0 ? { paddingLeft: `${depth * 5}px` } : undefined
  }
  const isEditing = editingNodeId === node.id

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
            onCancel={handleDeleteOrCancelNode}
          />
        ) : (
          <>
            <div className={styles.treeNodeItemContainer}>
              {node.type === 'folder' ? (
                <>
                  <button
                    className={styles.collapseBtn}
                    onClick={handleDoubleClick}
                  >
                    {isExpanded ? '-' : '+'}
                  </button>
                  <img src={folderIcon} alt="folder" className={styles.icon} />
                </>
              ) : (
                <img src={fileIcon} alt="file" className={styles.icon} />
              )}
              <div
                onDoubleClick={() => {
                  setIsRenaming(true)
                  setIsHover(false)
                }}
              >
                {isRenaming ? ( // callback function review
                  <TreeNodeEdit
                    nodeName={node.name || ''}
                    onSave={(input) => {
                      handleSaveNode(input)
                      setIsRenaming(false)
                    }}
                    onCancel={
                      node.name
                        ? () => setIsRenaming(false)
                        : handleDeleteOrCancelNode
                    }
                  />
                ) : (
                  node.name
                )}
              </div>
            </div>
            {isHover && !editingNodeId && (
              <div className={styles.actionBtnContainer}>
                {node.type === 'folder' && (
                  <button className={styles.actionBtn} onClick={handleAddNode}>
                    <img src={addIconDark} alt="add" />
                  </button>
                )}
                <button
                  className={styles.actionBtn}
                  onClick={handleDeleteOrCancelNode}
                >
                  <img src={deleteIconDark} alt="delete" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {node.children && node.children.length > 0 && isExpanded && (
        <ul>
          {node.children.map((child) => {
            return (
              <TreeNode
                key={child.id}
                node={child} // loop the chrildre array and pass the child node to the TreeNode component
                parentNode={node} // pass the parent node to the child
                depth={depth + 1}
              />
            )
          })}
        </ul>
      )}
      {nodeTypeSelect === node.id && (
        //   <div style={indentationStyle(depth)}>
        <div>
          <button
            className={styles.typeSelectionBtn}
            onClick={() => childTypeSelector('folder')}
          >
            Folder
          </button>
          <button
            className={styles.typeSelectionBtn}
            onClick={() => childTypeSelector('file')}
          >
            File
          </button>
        </div>
      )}
    </li>
  )
}

export default TreeNode
