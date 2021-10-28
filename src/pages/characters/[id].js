import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { Layout, SEO } from "../../components";
import { Row, Col } from "react-flexbox-grid";
import { Link } from "gatsby";
import { getIdFromURI } from "../../utils/getIdFromURI";
import { getCharacter } from "../../redux/actionCreators/characters";
import DetailContainer from "../../components/container";

const ComicImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
`;

const Character = (props) => {
  const { getCharacter, params, character } = props;
  const charId = params?.id || 0;

  useEffect(() => {
    getCharacter(charId);
  }, [getCharacter, charId]);

  return (
    <Layout>
      <SEO title="Character Detail" />

      <DetailContainer>
        {character && (
          <React.Fragment>
            <h2 style={{ textAlign: "center" }}>{character.name}</h2>

            <Row>
              <Col md={4}>
                <ComicImg
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt="character"
                />
              </Col>
              <Col md={8}>
                <p>{character.description}</p>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md={6}>
                <h2 style={{ textAlign: "center" }}>Character's Comics</h2>

                <ul>
                  {character.comics.items.map((_story, index) => (
                    <li key={index}>
                      <Link
                        to={`/characters?comicId=${getIdFromURI(
                          _story.resourceURI
                        )}`}
                      >
                        {_story.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>

              <Col md={6}>
                <h2 style={{ textAlign: "center" }}>Character's Stories</h2>

                <ul>
                  {character.stories.items.map((_story, index) => (
                    <li key={index}>
                      <Link
                        to={`/characters?storyId=${getIdFromURI(
                          _story.resourceURI
                        )}`}
                      >
                        {_story.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </DetailContainer>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  character: state.entities.selectedCharacter,
});

const mapDispatchToProps = (dispatch) => ({
  getCharacter: bindActionCreators(getCharacter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Character);
