import React, { useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components"
import { Layout, SEO } from "../../components"
import { Row, Col } from "react-flexbox-grid"
import { Link } from "gatsby"
import { getIdFromURI } from "../../utils/getIdFromURI"
import { getStoryById } from "../../redux/actionCreators/stories"

import MarvelLogo from "../../assets/images/logo.svg"
import DetailContainer from "../../components/container"

const StoryImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
`

const Story = props => {
  const { getStoryById, params, story } = props
  const storyId = params?.id || 0

  useEffect(() => {
    getStoryById(storyId)
  }, [getStoryById, storyId])

  console.log(story)

  return (
    <Layout>
      <SEO title="Story Detail" />

      <DetailContainer>
        {story && (
          <React.Fragment>
            <h2 style={{ textAlign: "center" }}>{story.title}</h2>

            <Row>
              <Col md={4}>
                <StoryImg src={MarvelLogo} alt="story" />
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={6}>
                    <h2 style={{ textAlign: "center" }}>Stories Characters</h2>

                    <ul>
                      {story.characters.items.map((_char, index) => (
                        <li key={index}>
                          <Link
                            to={`/characters/${getIdFromURI(
                              _char.resourceURI
                            )}`}
                          >
                            {_char.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Col>

                  <Col md={6}>
                    <h2 style={{ textAlign: "center" }}>Stories Comics</h2>

                    <ul>
                      {story.comics.items.map((_story, index) => (
                        <li key={index}>
                          <Link
                            to={`/comic/${getIdFromURI(_story.resourceURI)}`}
                          >
                            {_story.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
          </React.Fragment>
        )}
      </DetailContainer>
    </Layout>
  )
}

const mapStateToProps = state => ({
  story: state.entities.selectedStory,
})

const mapDispatchToProps = dispatch => ({
  getStoryById: bindActionCreators(getStoryById, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Story)
