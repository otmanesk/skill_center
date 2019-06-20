import { Grid, Paper } from '@material-ui/core';
import { Button, ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import { Table } from '../../components';
import Popup from 'reactjs-popup';

const DELETE_TRAINING = gql`
  mutation deleteTraining($id: String!, $trainings: [TrainingInput]) {
    deleteTraining(id: $id, trainings: $trainings) {
      id
      name
    }
  }
`;
const Update_TRAINING = gql`
  mutation updateTraining($id: String!, $trainings: [TrainingInput]) {
    updateTraining(id: $id, trainings: $trainings) {
      trainings {
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
  query User($Id: String) {
    User(id: $Id) {
      id
      trainings {
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

const ADD_TRAINING = gql`
  mutation addTraining($id: String!, $trainings: [TrainingInput]) {
    addTraining(id: $id, trainings: $trainings) {
      trainings {
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

class Training extends Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    let name, Type, Site, Rank, startDate, former, EndDate;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Training"
              content={
                <div>
                  <Grid item xs={12} container>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        return (
                          <Mutation
                            mutation={ADD_TRAINING}
                            key={data.User.id}
                            onCompleted={() =>
                              this.props.history.push(`/training`)
                            }
                          >
                            {(addTraining, { loading, error }) => (
                              <>
                                <Button
                                  color="primary"
                                  round
                                  onClick={() => this.openModal()}
                                >
                                  Add Training
                                </Button>
                                <Modal
                                  visible={this.state.visible}
                                  width="400"
                                  height="620"
                                  effect="fadeInUp"
                                  onClickAway={() => this.closeModal()}
                                >
                                  <div className="container">
                                    <div className="panel panel-default">
                                      <div className="panel-body">
                                        <form
                                          onSubmit={e => {
                                            e.preventDefault();
                                            addTraining({
                                              variables: {
                                                id: data.User.id,
                                                trainings: {
                                                  name: name.value,
                                                  Type: Type.value,
                                                  Site: Site.value,
                                                  Rank: Rank.value,
                                                  startDate: startDate.value,
                                                  former: former.value,
                                                  EndDate: EndDate.value
                                                }
                                              },
                                              refetchQueries: [
                                                { query: GET_USERS }
                                              ]
                                            });
                                            name.value = '';
                                            Type.value = '';
                                            Site.value = '';
                                            Rank.value = '';
                                            startDate.value = '';
                                            former.value = '';
                                            EndDate.value = '';
                                          }}
                                        >
                                          <br />
                                          <div className="form-group">
                                            <label htmlFor="name">name:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="name"
                                              ref={node => {
                                                name = node;
                                              }}
                                              placeholder="name"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="Type">Type:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Type"
                                              ref={node => {
                                                Type = node;
                                              }}
                                              placeholder="Type"
                                            />
                                          </div>

                                          <div className="form-group">
                                            <label htmlFor="Site">Site:</label>
                                            <input
                                              className="form-control"
                                              name="Site"
                                              ref={node => {
                                                Site = node;
                                              }}
                                              placeholder="Site"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="Rank">Rank:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Rank"
                                              ref={node => {
                                                Rank = node;
                                              }}
                                              placeholder="Rank"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="startDate">
                                              startDate:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="startDate"
                                              ref={node => {
                                                startDate = node;
                                              }}
                                              placeholder="startDate"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="former">
                                              former:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="former"
                                              ref={node => {
                                                former = node;
                                              }}
                                              placeholder="former"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="EndDate">
                                              EndDate:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="EndDate"
                                              ref={node => {
                                                EndDate = node;
                                              }}
                                              placeholder="EndDate"
                                            />
                                          </div>
                                          <Button
                                            color="primary"
                                            round
                                            type="submit"
                                            onClick={() => this.closeModal()}
                                          >
                                            Add Training
                                          </Button>
                                          <Button
                                            color="primary"
                                            round
                                            onClick={() => this.closeModal()}
                                          >
                                            Close{' '}
                                          </Button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>

                                  {loading && <p>Loading...</p>}
                                  {error && <p>Error :( Please try again</p>}
                                </Modal>
                              </>
                            )}
                          </Mutation>
                        );
                      }}
                    </Query>
                  </Grid>
                  <Grid>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                      pollInterval={300}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        var fo = data.User.trainings;

                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          const id = item[0];
                          const nom = item[1];
                          const rank = item[2];
                          const type = item[3];
                          const site = item[4];
                          let former = item[5];
                          item.push(
                            <Mutation
                              mutation={Update_TRAINING}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/training')
                              }
                            >
                              {(updateTraining, { loading, error }) => (
                                <>
                                  <Popup
                                    open={false}
                                    trigger={
                                      <Button color="primary" round>
                                        Edit{' '}
                                      </Button>
                                    }
                                    position="top left"
                                    modal
                                    closeOnDocumentClick
                                  >
                                    {close => (
                                      <div>
                                        <div className="container">
                                          <div className="panel panel-default">
                                            <div className="panel-body">
                                              <form
                                                onSubmit={e => {
                                                  e.preventDefault();
                                                  updateTraining({
                                                    variables: {
                                                      id: data.User.id,
                                                      trainings: {
                                                        id: id,
                                                        name: name.value,
                                                        Type: Type.value,
                                                        Site: Site.value,
                                                        Rank: Rank.value,
                                                        startDate:
                                                          startDate.value,
                                                        former: former.value,
                                                        EndDate: EndDate.value
                                                      }
                                                    }
                                                  }).then(() => {
                                                    close();
                                                  });
                                                  name.value = '';
                                                  Type.value = '';
                                                  Site.value = '';
                                                  Rank.value = '';
                                                  startDate.value = '';
                                                  former.value = '';
                                                  EndDate.value = '';
                                                  close();
                                                }}
                                              >
                                                <br />
                                                <div className="form-group">
                                                  <label htmlFor="name">
                                                    name:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    ref={node => {
                                                      name = node;
                                                    }}
                                                    placeholder="name"
                                                    defaultValue={nom.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Type">
                                                    Type:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Type"
                                                    ref={node => {
                                                      Type = node;
                                                    }}
                                                    placeholder="Type"
                                                    defaultValue={type.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Site">
                                                    Site:
                                                  </label>
                                                  <input
                                                    className="form-control"
                                                    name="Site"
                                                    ref={node => {
                                                      Site = node;
                                                    }}
                                                    placeholder="Site"
                                                    defaultValue={site.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Rank">
                                                    Rank:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Rank"
                                                    ref={node => {
                                                      Rank = node;
                                                    }}
                                                    placeholder="Rank"
                                                    defaultValue={rank.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="former">
                                                    former:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="former"
                                                    ref={node => {
                                                      former = node;
                                                    }}
                                                    placeholder="former"
                                                    defaultValue={former.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="startDate">
                                                    startDate:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="startDate"
                                                    ref={node => {
                                                      startDate = node;
                                                    }}
                                                    placeholder="startDate"
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="EndDate">
                                                    EndDate:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="EndDate"
                                                    ref={node => {
                                                      EndDate = node;
                                                    }}
                                                    placeholder="EndDate"
                                                  />
                                                </div>
                                                <Button
                                                  color="primary"
                                                  round
                                                  type="submit"
                                                >
                                                  Edit{' '}
                                                </Button>
                                                <Button
                                                  color="primary"
                                                  round
                                                  onClick={() => {
                                                    close();
                                                  }}
                                                >
                                                  Close{' '}
                                                </Button>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Popup>
                                </>
                              )}
                            </Mutation>,
                            <Mutation
                              mutation={DELETE_TRAINING}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/training')
                              }
                            >
                              {(deleteTraining, { loading, error }) => (
                                <div>
                                  <form
                                    onSubmit={e => {
                                      e.preventDefault();
                                      deleteTraining({
                                        variables: {
                                          id: data.User.id,
                                          trainings: {
                                            id: id.toString()
                                          }
                                        }
                                      });
                                    }}
                                  >
                                    &nbsp;
                                    <button
                                      type="submit"
                                      className="btn btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </form>
                                  {loading && <p>Loading...</p>}
                                  {error && <p>Error :( Please try again</p>}
                                </div>
                              )}
                            </Mutation>
                          );
                        });
                        array.map(i => {
                          i.splice(0, 1);
                        });
                        array.map(i => {
                          i.splice(5, 3);
                        });
                        return (
                          <Paper>
                            <Table
                              tableHeaderColor="warning"
                              tableHead={[
                                'Name',
                                'Type',
                                'Site',
                                'Rank',
                                'former',
                                'actions'
                              ]}
                              tableData={array}
                            />
                          </Paper>
                        );
                      }}
                    </Query>
                  </Grid>
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Training.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Training);
