import React from 'react'
import CodeEditor from '../Components/CodingArenaComponents/CodeEditor'
import Split from 'react-split'
import ProblemBox from '../Components/CodingArenaComponents/ProblemBox'


const ProblemMainPage = () => {
  return (
    <Split className='split' minSize={600}>
      <div>
        <ProblemBox/>
      </div>        
      <CodeEditor />
    </Split>
  )
}

export default ProblemMainPage
