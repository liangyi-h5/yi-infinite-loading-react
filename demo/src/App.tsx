import React, { Fragment, useCallback, useState } from 'react'
import './App.css'
import YiInfiniteLoading from 'yi-infinite-loading-react'
function App() {
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [list, setList] = useState<number[]>([])

  const loadMore = useCallback(() => {
    if (loading) {
      return
    }
    setLoading(true)
    setTimeout(() => {
      const len = list.length
      for (let i = 1; i <= 10; i++) {
        list.push(len + i)
      }
      setLoading(false)
      if (list.length > 100) {
        setFinished(true)
      }
    }, 1000)
  },[loading, finished])

  const clear = () => {
    setList([])
    setFinished(false)
  }
  return (
    <Fragment>
      <div className="infinite-scroll-box">
        <ul className="infinite-scroll-list">
          {list.map(item => {
            return (
              <li key={item} className="infinite-scroll-item" >
                { item }
              </li>
            )
          })}
        </ul>
      <YiInfiniteLoading
        loading={loading}
        finished={finished}
        offset={100}
        hideLoading={true}
        loadMore={loadMore}
        >
          {loading && <span className="tips" v-if="isLoading">loading...</span> }
          { finished && <span className="tips" v-if="finished">end...</span> }
        
      </YiInfiniteLoading>
    </div>
    <div className="clear" >
      <button onClick={clear} >clear</button>
      {
        loading ? null : (
          <button onClick={loadMore} >load more</button>
        )
      }
    </div>
  </Fragment>
  );
}

export default App;
