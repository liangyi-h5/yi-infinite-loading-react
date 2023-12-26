
# infinite-loading-react
An infinite loading component for React (16.8+)!

## Installation
```
npm install yi-infinite-loading-react
```

<!-- <h3><a href="https://liangyi-h5.github.io/yi-infinite-loading-vue3/">demo</a> -->

## Props

| props             | description                     | type               | default    |
| --------------- | ---------- | ---------- | ---------- |
| loadMore      | callback | function | function |
| loading | is loading | booblean | false |
| finished | is loaded | boolean | false |
| offset | distance from bottom | string ｜ number | 0 |
| hideLoading | Whether to hide the default loading status | boolean | false |

## Usage

```tsx
import React, { Fragment, useCallback, useState } from 'react'
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
```
