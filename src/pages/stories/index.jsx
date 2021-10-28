import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, InfiniteLoaderWrapper, Layout, SEO } from "../../components";
import styled from "styled-components";
import { setUIField } from "../../redux/actions/main";

import { setFavorite } from "../../redux/actions/favorites";
import { navigate } from "gatsby-link";
import { loadStories } from "../../redux/actionCreators/stories";

import MarvelLogo from "../../assets/images/logo.svg"

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StoriesList = (props) => {
  const {
    loadStories,
    setUIField,
    stories,
    favorites,
    setFavorite,
    ui: { key, hasNextPage, isNextPageLoading },
  } = props;

  const _loadNextPage = (startIndex, endIndex) => {
    setUIField(key, "isNextPageLoading", true);

    const options = {
      offset: startIndex,
    };

    loadStories(options);
  };

  return (
    <Layout>
      <SEO title="Stories" />
      <Container>
        <InfiniteLoaderWrapper
          itemSize={400}
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          items={stories.allIds}
          itemsObj={stories.byId}
          loadNextPage={_loadNextPage}
          renderComponent={(_story) => {
            const _imageURL = _story.thumbnail
              ? `${_story.thumbnail.path}.${_story.thumbnail.extension}`
              : MarvelLogo;

            return (
              <Card
                onClick={() => navigate(`/story/${_story.id}`)}
                isFavorite={!!favorites[_story.id]}
                onClickFavorite={() =>
                  setFavorite("stories", _story.id, _story)
                }
                imageUrl={_imageURL}
                text={_story.title}
              />
            );
          }}
        />
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui.storiesList,
  stories: state.entities.stories,
  favorites: state.favorites.stories,
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: bindActionCreators(loadStories, dispatch),
  setUIField: bindActionCreators(setUIField, dispatch),
  setFavorite: bindActionCreators(setFavorite, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoriesList);
