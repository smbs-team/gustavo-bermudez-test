import React, { useCallback, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { loadCharacters } from "../../redux/actionCreators/characters"
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

import { GRAY_COLOR, RED_COLOR } from "../../constants/colors"
import { CLEAR_ENTITY } from "../../redux/constants/entities"
import { navigate } from "gatsby-link"
import { setFavorite } from "../../redux/actions/favorites"
import { useQueryParam, NumberParam } from "use-query-params"
import { Col, Row } from "react-flexbox-grid"

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const CharactersList = props => {
  const {
    fetchCharacters,
    setUIField,
    characters,
    dispatch,
    ui: { key, hasNextPage, isNextPageLoading, searchValue, orderBy },
    favorites: { characters: favoritesCharacters },
    setFavorite,
  } = props

  const [comicId] = useQueryParam("comicId", NumberParam)
  const [storyId] = useQueryParam("storyId", NumberParam)

  const _loadNextPage = (startIndex, endIndex) => {
    console.log("loadNextPage", startIndex, endIndex)
    setUIField(key, "isNextPageLoading", true)

    const options = {
      offset: startIndex,
      orderBy,
      ...(searchValue && { nameStartsWith: searchValue }),
      ...(comicId && { comicsIds: [comicId] }),
      ...(storyId && { storiesIds: [storyId] }),
    }

    console.log("Load next Obj: ", options)

    fetchCharacters(options)
  }

  useEffect(() => {
    dispatch({ type: CLEAR_ENTITY, payload: { entity: "characters" } })
  }, [])

  return (
    <Layout>
      <SEO title="Characters List" />

      <Row>
        <Col md={6}>
          <StyledInput
            value={searchValue}
            placeholder="Search by name"
            onChange={evt => setUIField(key, "searchValue", evt.target.value)}
          />

          <StyledButton
            onClick={() => {
              dispatch({
                type: CLEAR_ENTITY,
                payload: { entity: "characters" },
              })
              setUIField(key, "hasNextPage", true)
            }}
          >
            Search
          </StyledButton>
        </Col>
        <Col md={6}>
          <StyledSelect
            value={orderBy}
            onChange={evt => {
              setUIField(key, "orderBy", evt.target.value)
              dispatch({
                type: CLEAR_ENTITY,
                payload: { entity: "characters" },
              })
            }}
          >
            <option value="name">Ascending</option>
            <option value="-name">Descending</option>
          </StyledSelect>
        </Col>
      </Row>

      <Container>
        <InfiniteLoaderWrapper
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={characters.allIds}
          itemsObj={characters.byId}
          loadNextPage={_loadNextPage}
          renderComponent={_character => {
            const _imageURL = `${_character.thumbnail.path}.${_character.thumbnail.extension}`

            return (
              <Card
                onClick={() => navigate(`/characters/${_character.id}`)}
                imageUrl={_imageURL}
                isFavorite={!!favoritesCharacters[_character.id]}
                onClickFavorite={() => {
                  setFavorite("characters", _character.id, _character)
                }}
                text={_character.name}
              />
            )
          }}
        />
      </Container>
    </Layout>
  )
}

const mapStateToProps = state => ({
  ui: state.ui.charactersList,
  characters: state.entities.characters,
  favorites: state.favorites,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchCharacters: bindActionCreators(loadCharacters, dispatch),
  setUIField: bindActionCreators(setUIField, dispatch),
  setFavorite: bindActionCreators(setFavorite, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)
