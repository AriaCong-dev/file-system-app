import styles from './TreeView.module.scss'
import TreeNode from './TreeNode'
import { NodeModel } from '../models/node.model'
import { useTreeContext } from '../contexts/TreeContext'
import { useEffect } from 'react'

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

  // 1 Recursively search the treeArray for nodes that match the searchValue (pseudo code)
  //   for (const node of treeArray) {
  //     if (node.name?.includes(searchValue)) {
  //       searchResults.push(node)
  //     }
  //     if (node.children && node.children.length > 0) {
  //       for (const childNode of node.children) {
  //         if (childNode.name?.includes(searchValue)) {
  //           searchResults.push(childNode)
  //         }
  //       }
  //     }
  //   }

  //   const handleIteration = (node: NodeModel) => {
  //     const stack: NodeModel[] = [node] // define an array to save the stack

  //     while (stack.length > 0) {
  //       const current = stack.pop() // remove executed node
  //       if (!current) continue

  //       if (current.children) {
  //         current.children.forEach((node) => {
  //           stack.push(node)
  //         })
  //       }
  //       checkAndAddToSearchResult(current)
  //     }
  //   }
  const searchResults: NodeModel[] = []
  useEffect(() => {
    const checkAddToSearchResults = (childNode: NodeModel) => {
      if (childNode.name?.includes(searchValue)) {
        searchResults.push(childNode)
      }
    }
    const handleRecursionCheck = (node: NodeModel) => {
      node.children?.forEach((childNode: NodeModel) => {
        checkAddToSearchResults(childNode)
        handleRecursionCheck(childNode)
      })
    }
    treeArray.forEach((node) => handleRecursionCheck(node))
    console.log('searchResults', searchResults)
  }, [searchValue, treeArray])

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
        <h2>Searching file/folder here:</h2>
        <input
          className={styles.searchInput}
          autoFocus
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <ul>
          {searchResults.map((node) => (
            <li key={node.id}>
              {node.name}_{node.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TreeView
