import React from 'react'
import TreeView from './components/TreeView'
import Header from './components/Header'
import { TreeContextProvider } from './contexts/TreeContext'
import JsonViewer from './components/JsonViewer'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="App">
      <Header />
      <TreeContextProvider>
        <TreeView />
        <JsonViewer />
        <SearchBar />
      </TreeContextProvider>
    </div>
  )
}

export default App
