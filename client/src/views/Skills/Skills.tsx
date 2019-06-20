import { Grid, Paper } from '@material-ui/core';
import Pie from '../../components/Charts/Pie/Pie';
import { Button, ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import Popup from 'reactjs-popup';
import { Table } from '../../components';
import { gql } from 'apollo-boost';

const DELETE_SKILL = gql`
  mutation deleteSkill($id: String!, $skills: [SkillInput]) {
    deleteSkill(id: $id, skills: $skills) {
      id
      name
    }
  }
`;
const Update_SKILL = gql`
  mutation updateSkill($id: String!, $skills: [SkillInput]) {
    updateSkill(id: $id, skills: $skills) {
      skills {
        id
        name
        value
      }
    }
  }
`;

const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      skills {
        id
        name
        value
      }
    }
  }
`;

const ADD_SKILL = gql`
  mutation addSkill($id: String!, $skills: [SkillInput]) {
    addSkill(id: $id, skills: $skills) {
      skills {
        id
        name
        value
      }
    }
  }
`;

class Skills extends React.Component<any, any> {
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
    let name, value;
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle="Edit Skills"
              cardSubtitle="Add your Skills"
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
                            mutation={ADD_SKILL}
                            key={data.User.id}
                            onCompleted={() =>
                              this.props.history.push(`/Skills`)
                            }
                          >
                            {(addSkill, { loading, error }) => (
                              <>
                                <Button
                                  color="primary"
                                  round
                                  onClick={() => this.openModal()}
                                >
                                  Add Skills
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
                                            addSkill({
                                              variables: {
                                                id: data.User.id,
                                                skills: {
                                                  name: name.value,
                                                  value: value.value
                                                }
                                              }
                                            });
                                            name.value = '';
                                            value.value = '';
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
                                            <label htmlFor="Type">Value:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Value"
                                              ref={node => {
                                                value = node;
                                              }}
                                              placeholder="Value"
                                            />
                                          </div>

                                          <Button
                                            color="primary"
                                            round
                                            type="submit"
                                            onClick={() => this.closeModal()}
                                          >
                                            Add Skills
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
                        var fo = data.User.skills;

                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          let id = item[0];
                          let nom = item[1];
                          let value = item[2];
                          item.push(
                            <Mutation
                              mutation={Update_SKILL}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/Skills')
                              }
                            >
                              {(updateSkills, { loading, error }) => (
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
                                                  updateSkills({
                                                    variables: {
                                                      id: data.User.id,
                                                      skills: {
                                                        id: id,
                                                        name: name.value,
                                                        value: value.value
                                                      }
                                                    }
                                                  }).then(() => {
                                                    close();
                                                  });
                                                  name.value = '';
                                                  value.value = '';

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
                                                  <label htmlFor="value">
                                                    value :
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="value"
                                                    ref={node => {
                                                      value = node;
                                                    }}
                                                    placeholder="value"
                                                    defaultValue={value.toString()}
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
                              mutation={DELETE_SKILL}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/skills')
                              }
                            >
                              {(deleteSkills, { loading, error }) => (
                                <div>
                                  <form
                                    onSubmit={e => {
                                      e.preventDefault();
                                      deleteSkills({
                                        variables: {
                                          id: data.User.id,
                                          skills: {
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
                        console.log(array);
                        return (
                          <Paper>
                            <Table
                              tableHeaderColor="warning"
                              tableHead={['name', 'value', 'action']}
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

Skills.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Skills);
