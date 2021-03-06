import { Grid, Paper } from '@material-ui/core';
import { Button, ItemGrid, RegularCard, Table } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import Popup from 'reactjs-popup';

const GET_USERS = gql`
  query User($Id: String!) {
    User(id: $Id) {
      id
      projects {
        id
        name
        description
        technology

        size
        Site
        startDate
        EndDate
        status
        Progress
      }
    }
  }
`;
const ADD_PROJECT = gql`
  mutation addProject($id: String!, $projects: [ProjectInput]) {
    addProject(id: $id, projects: $projects) {
      projects {
        id
        name
        description
        technology

        size
        Site
        startDate
        EndDate
        status
        Progress
      }
    }
  }
`;
const DELETE_PROJECT = gql`
  mutation deleteProject($id: String!, $projects: [ProjectInput]) {
    deleteProject(id: $id, projects: $projects) {
      id
      name
    }
  }
`;
const Update_PROJECT = gql`
  mutation updateProject($id: String!, $projects: [ProjectInput]) {
    updateProject(id: $id, projects: $projects) {
      projects {
        id
        name
        description
        technology

        size
        Site
        startDate
        EndDate
        status
        Progress
      }
    }
  }
`;
class Project extends Component<any, any> {
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
    let name,
      description,
      Site,
      technology,
      startDate,
      EndDate,
      size,
      status,
      Progress;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Project"
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
                            mutation={ADD_PROJECT}
                            key={data.User.id}
                            onCompleted={() =>
                              this.props.history.push(`/projects`)
                            }
                          >
                            {(addProject, { loading, error }) => (
                              <>
                                <Button
                                  color="primary"
                                  round
                                  onClick={() => this.openModal()}
                                >
                                  Add Project
                                </Button>
                                <Modal
                                  visible={this.state.visible}
                                  width="400"
                                  height="700"
                                  effect="fadeInUp"
                                  onClickAway={() => this.closeModal()}
                                >
                                  <div className="container">
                                    <div className="panel panel-default">
                                      <div className="panel-body">
                                        <form
                                          onSubmit={e => {
                                            e.preventDefault();
                                            addProject({
                                              variables: {
                                                id: data.User.id,
                                                projects: {
                                                  name: name.value,
                                                  description:
                                                    description.value,
                                                  Site: Site.value,
                                                  size: size.value,
                                                  status: status.value,
                                                  technology: technology.value,
                                                  startDate: startDate.value,

                                                  EndDate: EndDate.value,
                                                  Progress: Progress.value
                                                }
                                              }
                                            });
                                            name.value = '';
                                            description.value = '';
                                            Site.value = '';
                                            technology.value = '';
                                            startDate.value = '';

                                            EndDate.value = '';
                                            status.value = '';
                                            size.value = '';
                                            Progress.value = '';
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
                                            <label htmlFor="description">
                                              description:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="description"
                                              ref={node => {
                                                description = node;
                                              }}
                                              placeholder="description"
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
                                            <label htmlFor="technology">
                                              technology:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="technology"
                                              ref={node => {
                                                technology = node;
                                              }}
                                              placeholder="technology"
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
                                            <label htmlFor="size">size:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="size"
                                              ref={node => {
                                                size = node;
                                              }}
                                              placeholder="size"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="status">
                                              status:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="status"
                                              ref={node => {
                                                status = node;
                                              }}
                                              placeholder="status"
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
                                          <div className="form-group">
                                            <label htmlFor="EndDate">
                                              Progress :
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Progress"
                                              ref={node => {
                                                Progress = node;
                                              }}
                                              placeholder="Progress"
                                            />
                                          </div>
                                          <Button
                                            color="primary"
                                            round
                                            type="submit"
                                            onClick={() => this.closeModal()}
                                          >
                                            Add Project
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

                        var fo = data.User.projects;

                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          let id = item[0];
                          let nom = item[1];
                          let description = item[2];
                          let site = item[3];
                          let technology = item[4];
                          let size = item[5];
                          let endDate = item[6];
                          let startDate = item[7];
                          let status = item[8];
                          let progress = item[9];

                          item.push(
                            <Mutation
                              mutation={Update_PROJECT}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/projects')
                              }
                            >
                              {(updateProject, { loading, error }) => (
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
                                                  updateProject({
                                                    variables: {
                                                      id: data.User.id,
                                                      projects: {
                                                        id: id,
                                                        name: name.value,
                                                        description:
                                                          description.value,
                                                        site: Site.value,
                                                        size: size.value,
                                                        status: status.value,
                                                        technology:
                                                          technology.value,
                                                        startDate:
                                                          startDate.value,

                                                        endDate: endDate.value,
                                                        progress: progress.value
                                                      }
                                                    }
                                                  }).then(() => {
                                                    close();
                                                  });
                                                  name.value = '';
                                                  description.value = '';
                                                  Site.value = '';
                                                  technology.value = '';
                                                  startDate.value = '';

                                                  endDate.value = '';
                                                  status.value = '';
                                                  size.value = '';
                                                  progress.value = '';
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
                                                  <label htmlFor="description">
                                                    description:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="description"
                                                    ref={node => {
                                                      description = node;
                                                    }}
                                                    placeholder="description"
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
                                                  <label htmlFor="technology">
                                                    technology:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="technology"
                                                    ref={node => {
                                                      technology = node;
                                                    }}
                                                    placeholder="technology"
                                                    defaultValue={technology.toString()}
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
                                                    defaultValue={startDate.toString()}
                                                  />
                                                </div>

                                                <div className="form-group">
                                                  <label htmlFor="size">
                                                    size:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="size"
                                                    ref={node => {
                                                      size = node;
                                                    }}
                                                    placeholder="size"
                                                    defaultValue={size.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="status">
                                                    status:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="status"
                                                    ref={node => {
                                                      status = node;
                                                    }}
                                                    placeholder="status"
                                                    defaultValue={status.toString()}
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
                                                      endDate = node;
                                                    }}
                                                    placeholder="EndDate"
                                                    defaultValue={endDate.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Progress">
                                                    Progress:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Progress"
                                                    ref={node => {
                                                      progress = node;
                                                    }}
                                                    placeholder="Progress"
                                                    defaultValue={progress.toString()}
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
                              mutation={DELETE_PROJECT}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/projects')
                              }
                            >
                              {(deleteProject, { loading, error }) => (
                                <div>
                                  <form
                                    onSubmit={e => {
                                      e.preventDefault();
                                      deleteProject({
                                        variables: {
                                          id: data.User.id,
                                          projects: {
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
                                'description',
                                'technology',

                                'Size',
                                'Site',
                                'Progress'
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

Project.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Project);
