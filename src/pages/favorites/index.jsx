import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Card, Layout, SEO } from "../../components"
import styled from "styled-components"

import { navigate } from "gatsby-link"
import { setFavorite } from "../../redux/actions/favorites"

import MarvelLogo from "../../assets/images/logo.svg"

import { Row, Col } from "react-flexbox-grid"

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 100px;
`

// const Row = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `

const FavoritesList = props => {
  const {
    favorites: {
      characters: favoritesCharacters,
      comics: favComics,
      stories: favStories,
    },
    setFavorite,
  } = props

  return (
    <Layout>
      <SEO title="Favorites" />
      <Container>
        <section>
          <h1>Favorites Characters</h1>
          <Row center="md">
            {Object.values(favoritesCharacters).map(_character => {
              const _imageURL = `${_character.thumbnail.path}.${_character.thumbnail.extension}`

              return (
                <Col md={3} key={_character.id}>
                  <Card
                    onClick={() => navigate(`/characters/${_character.id}`)}
                    imageUrl={_imageURL}
                    isFavorite={!!favoritesCharacters[_character.id]}
                    onClickFavorite={() => {
                      setFavorite("characters", _character.id, _character)
                    }}
                    text={_character.name}
                  />
                </Col>
              )
            })}
          </Row>
        </section>

        <section>
          <h1>Favorites Comics</h1>
          <Row center="md">
            {Object.values(favComics).map(_comic => {
              console.log(_comic)
              const _imageURL = `${_comic.thumbnail.path}.${_comic.thumbnail.extension}`

              return (
                <Col md={3} key={_comic.id}>
                  <Card
                    onClick={() => navigate(`/comic/${_comic.id}`)}
                    imageUrl={_imageURL}
                    isFavorite={!!favComics[_comic.id]}
                    onClickFavorite={() => {
                      setFavorite("comics", _comic.id, _comic)
                    }}
                    text={_comic.title}
                  />
                </Col>
              )
            })}
          </Row>
        </section>

        <section>
          <h1>Favorites Stories</h1>
          <Row center="md">
            {Object.values(favStories).map(_story => {
              return (
                <Col md={3} key={_story.id}>
                  <Card
                    onClick={() => navigate(`/story/${_story.id}`)}
                    imageUrl={MarvelLogo}
                    isFavorite={!!favStories[_story.id]}
                    onClickFavorite={() => {
                      setFavorite("stories", _story.id, _story)
                    }}
                    text={_story.title}
                  />
                </Col>
              )
            })}
          </Row>
        </section>
      </Container>
    </Layout>
  )
}

const mapStateToProps = state => ({
  favorites: state.favorites,
  entities: state.entities,
})

const mapDispatchToProps = dispatch => ({
  setFavorite: bindActionCreators(setFavorite, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList)
