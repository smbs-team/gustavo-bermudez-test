import React from "react"
import { FixedSizeList as List } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import styled from "styled-components"
import { Row, Col } from "react-flexbox-grid"

const Loading = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
`

function generateIndexesForRow(rowIndex, maxItemsPerRow, itemsAmount) {
  const result = []
  const startIndex = rowIndex * maxItemsPerRow

  for (
    let i = startIndex;
    i < Math.min(startIndex + maxItemsPerRow, itemsAmount);
    i++
  ) {
    result.push(i)
  }

  return result
}

export default function InfiniteLoaderWrapper({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Object of items loaded
  itemsObj,

  // Callback function responsible for loading the next page of items.
  loadNextPage,

  // Component to Render
  renderComponent,

  // Item Size
  itemSize = 350,
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasNextPage || index < items.length

  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    if (!isItemLoaded(index))
      return (
        <Row center="md" style={style}>
          <Col>
            <Loading>Loading...</Loading>
          </Col>
        </Row>
      )

    const Ids = generateIndexesForRow(index, 4, items.length).map(
      _itemIndex => items[_itemIndex]
    )

    return (
      <Row middle="md" style={style}>
        {Ids.map(_id => (
          <Col md={3} key={_id}>
            {renderComponent(itemsObj[_id])}
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={450}
          itemCount={itemCount}
          itemSize={itemSize}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={1200}
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  )
}
