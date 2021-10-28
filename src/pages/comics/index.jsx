import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {
  Card,
  InfiniteLoaderWrapper,
  Layout,
  SEO,
  StyledButton,
  StyledInput,
  StyledSelect,
} from "../../components"
import styled from "styled-components"
import { setUIField } from "../../redux/actions/main"

import { loadComics } from "../../redux/actionCreators/comics"
import { setFavorite } from "../../redux/actions/favorites"
import { navigate } from "gatsby-link"
import { Col, Row } from "react-flexbox-grid"
import { CLEAR_ENTITY } from "../../redux/constants/entities"

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const filterOptions = [
  { label: "--Select filter--", value: "" },
  { label: "Format", value: "format" },
  { label: "Title", value: "titleStartsWith" },
  { label: "Issue Number", value: "issueNumber" },
]

const formatOptions = [
  { label: "--Select format--", value: "" },
  { label: "Comic", value: "comic" },
  { label: "Magazine", value: "magazine" },
  { label: "Trade paperback", value: "trade paperback" },
  { label: "Hardcore", value: "hardcover" },
  { label: "Digest", value: "digest" },
  { label: "Graphic Novel", value: "graphic novel" },
  { label: "Digital Comic", value: "digital comic" },
  { label: "Infinite Comic", value: "infinite comic" },
]

const ComicsList = props => {
  const {
    loadComics,
    setUIField,
    comics,
    favorites,
    setFavorite,
    dispatch,
    ui: { key, hasNextPage, isNextPageLoading, filterBy, filterValue, orderBy },
  } = props

  const _loadNextPage = (startIndex, endIndex) => {
    console.log("Loaded: ", startIndex, endIndex)
    setUIField(key, "isNextPageLoading", true)

    const options = {
      ...(orderBy && { orderBy }),
      ...(filterBy && filterValue && { [filterBy]: filterValue }),
      offset: startIndex,
    }

    loadComics(options)
  }

  const reaload = () => {
    dispatch({
      type: CLEAR_ENTITY,
      payload: { entity: "comics" },
    })

    setUIField(key, "hasNextPage", true)
  }

  return (
    <Layout>
      <SEO title="Comics" />

      <Row>
        <Col md={2}>
          <StyledSelect
            value={filterBy}
            onChange={evt => {
              setUIField(key, "filterBy", evt.target.value)
              setUIField(key, "filterValue", "")
            }}
          >
            {filterOptions.map((_opt, index) => (
              <option key={_opt.value} value={_opt.value}>
                {_opt.label}
              </option>
            ))}
          </StyledSelect>
        </Col>
        <Col md={6}>
          {filterBy === "format" && (
            <StyledSelect
              value={filterValue}
              onChange={evt => {
                setUIField(key, "filterValue", evt.target.value)
                reaload()
              }}
            >
              {formatOptions.map((_format, index) => (
                <option key={_format.value} value={_format.value}>
                  {_format.label}
                </option>
              ))}
            </StyledSelect>
          )}

          {filterBy && filterBy !== "format" && (
            <React.Fragment>
              <StyledInput
                value={filterValue}
                onChange={evt =>
                  setUIField(key, "filterValue", evt.target.value)
                }
              />

              <StyledButton
                onClick={() => {
                  reaload()
                }}
              >
                Search
              </StyledButton>
            </React.Fragment>
          )}

          {filterBy && (
            <StyledButton
              onClick={() => {
                setUIField(key, "filterBy", "")
                setUIField(key, "filterValue", "")

                reaload()
              }}
            >
              Clear
            </StyledButton>
          )}
        </Col>

        <Col md={2}>
          <StyledSelect
            value={orderBy}
            onChange={evt => {
              setUIField(key, "orderBy", evt.target.value)
              reaload()
            }}
          >
            <option value="">--Order by Issue Number--</option>
            <option value="issueNumber">Issue Ascending</option>
            <option value="-issueNumber">Issue Descending</option>
          </StyledSelect>
        </Col>
      </Row>

      <Container>
        <InfiniteLoaderWrapper
          itemSize={400}
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={comics.allIds}
          itemsObj={comics.byId}
          loadNextPage={_loadNextPage}
          renderComponent={_comic => {
            const _imageURL = `${_comic.thumbnail.path}.${_comic.thumbnail.extension}`

            return (
              <Card
                onClick={() => navigate(`/comic/${_comic.id}`)}
                isFavorite={!!favorites[_comic.id]}
                onClickFavorite={() => setFavorite("comics", _comic.id, _comic)}
                imageUrl={_imageURL}
                text={_comic.title}
              />
            )
          }}
        />
      </Container>
    </Layout>
  )
}

const mapStateToProps = state => ({
  ui: state.ui.comicsList,
  comics: state.entities.comics,
  favorites: state.favorites.comics,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  loadComics: bindActionCreators(loadComics, dispatch),
  setUIField: bindActionCreators(setUIField, dispatch),
  setFavorite: bindActionCreators(setFavorite, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ComicsList)
