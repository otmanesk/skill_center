import { Grid, withStyles, Paper } from '@material-ui/core';

import dashboardStyle from '../../assets/jss/material-dashboard-react/dashboardStyle';
import { ItemGrid, RegularCard, Snackbar } from '../../components';
import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { gql } from 'apollo-boost';
import { Table, Button } from '../../components';
import Training from '../../components/stats/Trainings';
import Display from '../../components/react-images/Display';
import Activity from '../../components/Charts/Activity/Activity';
import RangeSliderBar from '../../components/rangeSliderBar/RangeSliderBar';
import Bar from '../../components/Charts/Bar/Bar';
import SpiderWeb from '../../components/Charts/Spiderweb/Spiderweb';
import Donut from '../../components/Charts/Donut/Donut';
import Facet from '../../components/Facet/Facet';
import FacetHeader from '../../components/Facet/FacetHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';

const ADD_TRAINING = gql`
  mutation addTrainingFollowed(
    $id: String!
    $trainingsFollowed: [TrainingInput]
  ) {
    addTrainingFollowed(id: $id, trainingsFollowed: $trainingsFollowed) {
      trainingsFollowed {
        id
        name
        Type
        Site
        Rank
        former
        startDate
        EndDate
      }
    }
  }
`;
const GET_USERS = gql`
  {
    allUsers {
      id
      name
      username
      email
      trainings {
        id
        name
        Type
        Site
        former
      }
      trainingsFollowed {
        id
        name
        Type
        Site
        former
      }
    }
  }
`;

type Positions = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}

class Dashboard extends React.Component<Props & any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props: Props) {
    super(props);

    this.state = {
      tc: false
    };
    this.showNotification = this.showNotification.bind(this);
  }

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Display />
          </ItemGrid>
        </Grid>

        <Grid container>
          <ItemGrid xs={11} sm={11} md={4}>
            <Activity />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <SpiderWeb />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <Bar />
          </ItemGrid>
          <Grid container>
            <Facet>
              <FacetHeader title="Ranking">
                <RangeSliderBar />
              </FacetHeader>
            </Facet>
          </Grid>
        </Grid>
        <Grid container>
          <Training />
        </Grid>

        <Grid container>
          <ItemGrid xs={12} sm={6} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="User List "
              cardSubtitle="New employees on 15th September, 2016"
              content={
                <Query query={GET_USERS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    var fo = data.allUsers;
                    return (
                      <Paper>
                        <Table
                          tableHeaderColor="warning"
                          tableHead={['ID', 'Name', 'Username', 'Email']}
                          tableData={fo.map(item =>
                            Object.keys(item)
                              .map(function(_) {
                                return item[_];
                              })
                              .slice(0, 4)
                          )}
                        />
                      </Paper>
                    );
                  }}
                </Query>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6}>
            <RegularCard
              headerColor="purple"
              cardSubtitle="New employees on 15th September, 2016"
              cardTitle="Formation List "
              content={
                <Query query={GET_USERS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    const fo = data.allUsers;
                    const forma = fo.map(item => item.trainings);
                    console.log(forma);
                    const er = [];
                    forma.map(x =>
                      x.map(y => {
                        const btn = (
                          <Mutation mutation={ADD_TRAINING} key={y.id}>
                            {(addTrainingFollowed, { loading, error }) => (
                              <>
                                <Popup
                                  open={false}
                                  trigger={
                                    <Button color="primary" round>
                                      {'Follow '}
                                    </Button>
                                  }
                                  position="top left"
                                  modal
                                  closeOnDocumentClick
                                >
                                  {close => (
                                    <div className="container">
                                      <div className="panel panel-default">
                                        <div className="panel-body">
                                          <form
                                            onSubmit={e => {
                                              e.preventDefault();
                                              addTrainingFollowed({
                                                variables: {
                                                  id: this.props.auth.user.id,
                                                  trainingsfollowed: {
                                                    id: y.id,
                                                    name: y.name,
                                                    Type: y.Type,
                                                    Site: y.Site,
                                                    former: y.former
                                                  }
                                                }
                                              }).then(() => {
                                                close();
                                                this.showNotification('tc');
                                              });
                                            }}
                                          >
                                            <br />
                                            <div className="form-group">
                                              <h4>
                                                Are you sure you want to follow
                                                this formation ??
                                              </h4>
                                            </div>

                                            <Button
                                              color="primary"
                                              round
                                              type="submit"
                                            >
                                              {'Follow '}
                                            </Button>
                                            <Button
                                              color="primary"
                                              round
                                              onClick={() => close()}
                                            >
                                              {' Close'}
                                            </Button>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Popup>

                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                              </>
                            )}
                          </Mutation>
                        );
                        const v = { ...y, mutation: btn };
                        er.push(v);
                        console.log(er);
                      })
                    );
                    return (
                      <>
                        <Paper>
                          <Table
                            tableHeaderColor="warning"
                            tableHead={['Name', 'Type', 'Site', 'Rank']}
                            tableData={er.map(item =>
                              Object.keys(item).map(function(_) {
                                return item[_];
                              })
                            )}
                          />
                        </Paper>
                        <Grid container justify="center">
                          <Snackbar
                            place="tc"
                            color="success"
                            icon={CheckCircleIcon}
                            message="You have joined this formation"
                            open={this.state.tc}
                            closeNotification={() => {
                              this.setState({
                                tc: false
                              });
                            }}
                            close
                          />
                        </Grid>
                      </>
                    );
                  }}
                </Query>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }

  private showNotification(place: Positions) {
    // @ts-ignore
    this.setState({ [place]: true });

    // @ts-ignore
    setTimeout(() => this.setState({ [place]: false }), 6000);
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Dashboard));
