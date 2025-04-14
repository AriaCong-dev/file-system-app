import styles from './TreeView.module.scss'
import TreeNode from './TreeNode'
import { NodeModel } from '../models/node.model'
import { useTreeContext } from '../contexts/TreeContext'

const TreeView: React.FC = () => {
  const {
    treeArray,
    setTreeArray,
    editingNodeId,
    setEditingNodeId,
    searchValue,
    setSearchValue,
  } = useTreeContext()
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
      <div className={styles.treeView}>
        <button
          className={styles.addRootBtn}
          onClick={handleAddToRoot}
          disabled={editingNodeId !== null}
        >
          Add to Root
        </button>
        <ul className={styles.treeViewList}>
          {treeArray.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </ul>
      </div>
      <div className={styles.searchView}>
        <input
          className={styles.searchInput}
          autoFocus
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <ul></ul>
      </div>
    </div>
  )
}

export default TreeView
