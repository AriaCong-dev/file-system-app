import styles from './TreeView.module.scss'
import TreeNode from './TreeNode'
import { NodeModel } from '../models/node.model'
import { useTreeContext } from '../contexts/TreeContext'

const TreeView: React.FC = () => {
  const { treeArray, setTreeArray, setEditingNodeId } = useTreeContext()
  const handleAddToRoot = () => {
    const newNode: NodeModel = {
      id: Date.now().toString(),
      name: '',
      type: 'folder',
      children: [],
    }
    setEditingNodeId(newNode.id)
    setTreeArray((prev) => [...prev, newNode])
  }
  return (
    <div className={styles.treeViewContainer}>
      <button className={styles.addRootBtn} onClick={handleAddToRoot}>
        Add to Root
      </button>
      <ul className={styles.treeViewList}>
        {treeArray.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
  )
}

export default TreeView
