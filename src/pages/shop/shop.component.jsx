import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import WithSpinner from "../../components/with-spinner/withSpinner.component";

const WithSpinnerCollectionsOverview = WithSpinner(CollectionsOverview);

class ShopPage extends React.PureComponent {
  state = {
    loading: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1500);
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={() => (
            <WithSpinnerCollectionsOverview
              isLoading={loading}
              {...this.props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

export default ShopPage;
