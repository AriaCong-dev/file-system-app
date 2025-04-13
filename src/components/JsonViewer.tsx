import styles from './JsonViewer.module.scss'
import { useTreeContext } from '../contexts/TreeContext'

const JsonViewer: React.FC = () => {
  return (
    <div className={styles.jsonViewerContainer}>
      <h2 className={styles.title}>JSON Viewer</h2>
      <textarea
        readOnly
        className={styles.jsonViewer}
        value={JSON.stringify(useTreeContext().treeArray, null, 2)}
      />
    </div>
  )
}

export default JsonViewer
