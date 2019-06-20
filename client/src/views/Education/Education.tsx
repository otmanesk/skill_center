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

const DELETE_EDUCATION = gql`
  mutation deleteEducation($id: String!, $education: [EducationInput]) {
    deleteEducation(id: $id, education: $education) {
      id
      school
    }
  }
`;
const Update_EDUCATION = gql`
  mutation updateEducation($id: String!, $education: [EducationInput]) {
    updateEducation(id: $id, education: $education) {
      education {
        id
        school
        diploma
        university
        trainings
        certification
      }
    }
  }
`;
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      education {
        id
        school
        diploma
        university
        trainings
        certification
      }
    }
  }
`;

const ADD_EDUCATION = gql`
  mutation addEducation($id: String!, $education: [EducationInput]) {
    addEducation(id: $id, education: $education) {
      education {
        id
        school
        diploma
        university
        trainings
        certification
      }
    }
  }
`;

class Education extends Component<any, any> {
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
    let school, diploma, university, trainings, certification;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Education"
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
                            mutation={ADD_EDUCATION}
                            key={data.User.id}
                            onCompleted={() =>
                              this.props.history.push(`/education`)
                            }
                          >
                            {(addEducation, { loading, error }) => (
                              <>
                                <Button
                                  color="primary"
                                  round
                                  onClick={() => this.openModal()}
                                >
                                  Add Education
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
                                            addEducation({
                                              variables: {
                                                id: data.User.id,
                                                education: {
                                                  school: school.value,
                                                  diploma: diploma.value,
                                                  university: university.value,
                                                  trainings: trainings.value,
                                                  certification:
                                                    certification.value
                                                }
                                              }
                                            });
                                            school.value = '';
                                            diploma.value = '';
                                            university.value = '';
                                            trainings.value = '';
                                            certification.value = '';
                                          }}
                                        >
                                          <br />
                                          <div className="form-group">
                                            <label htmlFor="school">
                                              school name:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="school"
                                              ref={node => {
                                                school = node;
                                              }}
                                              placeholder="school"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="diploma">
                                              diploma :
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="diploma"
                                              ref={node => {
                                                diploma = node;
                                              }}
                                              placeholder="Diploma"
                                            />
                                          </div>

                                          <div className="form-group">
                                            <label htmlFor="university">
                                              university :
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="university"
                                              ref={node => {
                                                university = node;
                                              }}
                                              placeholder="university"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="trainings">
                                              Trainings :
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="trainings"
                                              ref={node => {
                                                trainings = node;
                                              }}
                                              placeholder="trainings"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="certification">
                                              certification:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="certification"
                                              ref={node => {
                                                certification = node;
                                              }}
                                              placeholder="certification"
                                            />
                                          </div>

                                          <Button
                                            color="primary"
                                            round
                                            type="submit"
                                            onClick={() => this.closeModal()}
                                          >
                                            Add Education
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
                        var fo = data.User.education;

                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          let id = item[0];
                          let school = item[1];
                          let university = item[2];
                          let trainings = item[3];
                          let certification = item[4];
                          let diploma = item[5];
                          item.push(
                            <Mutation
                              mutation={Update_EDUCATION}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/education')
                              }
                            >
                              {(updateEducation, { loading, error }) => (
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
                                                  updateEducation({
                                                    variables: {
                                                      id: data.User.id,
                                                      education: {
                                                        id: id,
                                                        school: school.value,
                                                        diploma: diploma.value,
                                                        university:
                                                          university.value,
                                                        certification:
                                                          certification.value,
                                                        trainings:
                                                          trainings.value
                                                      }
                                                    }
                                                  }).then(() => {
                                                    close();
                                                  });
                                                  school.value = '';
                                                  diploma.value = '';
                                                  university.value = '';
                                                  certification.value = '';
                                                  trainings.value = '';
                                                }}
                                              >
                                                <br />
                                                <div className="form-group">
                                                  <label htmlFor="school">
                                                    school name:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="school"
                                                    ref={node => {
                                                      school = node;
                                                    }}
                                                    placeholder="school"
                                                    defaultValue={school.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="trainings">
                                                    trainings :
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="trainings"
                                                    ref={node => {
                                                      university = node;
                                                    }}
                                                    placeholder="trainings"
                                                    defaultValue={university.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="diploma">
                                                    Diploma :
                                                  </label>
                                                  <input
                                                    className="form-control"
                                                    name="diploma"
                                                    ref={node => {
                                                      diploma = node;
                                                    }}
                                                    placeholder="diploma"
                                                    defaultValue={diploma.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="certification">
                                                    certification:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="certification"
                                                    ref={node => {
                                                      certification = node;
                                                    }}
                                                    placeholder="certification"
                                                    defaultValue={certification.toString()}
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
                              mutation={DELETE_EDUCATION}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/education')
                              }
                            >
                              {(deleteEducation, { loading, error }) => (
                                <div>
                                  <form
                                    onSubmit={e => {
                                      e.preventDefault();
                                      deleteEducation({
                                        variables: {
                                          id: data.User.id,
                                          education: {
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
                                'school',
                                'Diploma',
                                'University',
                                'Trainings',
                                'certification'
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

Education.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Education);
