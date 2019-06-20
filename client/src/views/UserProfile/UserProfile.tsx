import { Grid } from '@material-ui/core';
//import avatar from 'assets/img/faces/marc.jpg';
import { Button, ItemGrid, ProfileCard, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import Select from 'react-select';
import ReactUpload from '../../components/react-images/ReactUpload';

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];
const agencyOptions = [
  { value: 'rabat', label: 'Rabat' },
  { value: 'oujda', label: 'Oujda' }
];

import { gql } from 'apollo-boost';

const GET_USERS = gql`
  query User($Id: String!) {
    User(id: $Id) {
      id
      name
      email
      password
    }
  }
`;
const UPDATE_USERS = gql`
  mutation updateUser(
    $id: String!
    $name: String!
    $username: String!
    $status: String!
    $agency: String!
    $gender: String!
    $birthday: String!
    $email: String!
    $avatarUrl: String!
    $address: String!
    $phone: String!
    $availability: String!
  ) {
    updateUser(
      id: $id
      name: $name
      username: $username
      status: $status
      agency: $agency
      gender: $gender
      birthday: $birthday
      email: $email
      avatarUrl: $avatarUrl
      address: $address
      phone: $phone
      availability: $availability
    ) {
      id
      name
      username
      status
      agency
      gender
      birthday
      email
      avatarUrl
      address
      phone
      availability
    }
  }
`;
class UserProfile extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  render() {
    let name,
      username,
      status,
      agency,
      gender,
      birthday,
      email,
      avatarUrl,
      address,
      phone,
      availability;
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle="Edit Profile"
              cardSubtitle="Complete your profile"
              content={
                <div>
                  <Grid container>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        return (
                          <Mutation
                            mutation={UPDATE_USERS}
                            key={data.User.id}
                            onCompleted={() => this.props.history.push(`/`)}
                          >
                            {(updateUser, { loading, error }) => (
                              <>
                                <div className="container">
                                  <div className="panel panel-default">
                                    <div className="panel-body">
                                      <form
                                        onSubmit={e => {
                                          e.preventDefault();
                                          updateUser({
                                            variables: {
                                              id: data.User.id,
                                              name: name.value,
                                              username: username.value,
                                              status: status.value,
                                              agency: agency.value,
                                              gender: gender.value,
                                              birthday: birthday.value,
                                              email: email.value,
                                              avatarUrl: avatarUrl.value,
                                              address: address.value,
                                              availability: availability.value,
                                              phone: phone.value
                                            }
                                          });
                                          name.value = '';
                                          username.value = '';
                                          status.value = '';
                                          agency.value = '';
                                          gender.value = '';
                                          birthday.value = '';
                                          email.value = '';
                                          avatarUrl.value = '';
                                          address.value = '';
                                          phone.value = '';
                                          availability.value = '';
                                        }}
                                      >
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
                                            defaultValue={data.User.name}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="username">
                                            username:
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            ref={node => {
                                              username = node;
                                            }}
                                            placeholder="username"
                                            defaultValue={data.User.username}
                                          />
                                        </div>

                                        <div className="form-group">
                                          <label htmlFor="status">
                                            status:
                                          </label>
                                          <input
                                            className="form-control"
                                            name="status"
                                            ref={node => {
                                              status = node;
                                            }}
                                            placeholder="status"
                                            defaultValue={data.User.status}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="agency">
                                            agency:
                                          </label>
                                          <Select
                                            options={agencyOptions}
                                            className="form-control"
                                            name="agency"
                                            ref={node => {
                                              agency = node;
                                            }}
                                            defaultValue={data.User.agency}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="gender">
                                            gender:
                                          </label>
                                          <Select
                                            options={options}
                                            className="form-control"
                                            name="gender"
                                            ref={node => {
                                              gender = node;
                                            }}
                                            defaultValue={data.User.gender}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="birthday">
                                            birthday:
                                          </label>
                                          <input
                                            type="date"
                                            className="form-control"
                                            name="birthday"
                                            ref={node => {
                                              birthday = node;
                                            }}
                                            placeholder="birthday"
                                            defaultValue={data.User.birthday}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="email">email:</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            ref={node => {
                                              email = node;
                                            }}
                                            placeholder="email"
                                            defaultValue={data.User.email}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="address">
                                            address:
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            ref={node => {
                                              address = node;
                                            }}
                                            placeholder="address"
                                            defaultValue={data.User.address}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="phone">phone:</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            ref={node => {
                                              phone = node;
                                            }}
                                            placeholder="phone"
                                            defaultValue={data.User.phone}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="availability">
                                            availability :
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            name="availability"
                                            ref={node => {
                                              availability = node;
                                            }}
                                            placeholder="availability"
                                            defaultValue={
                                              data.User.availability
                                            }
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="availability">
                                            upload profile :
                                          </label>
                                          <br />
                                          <input
                                            type="file"
                                            className="form-control"
                                            name="avatarUrl"
                                            ref={node => {
                                              avatarUrl = node;
                                            }}
                                            placeholder="avatarUrl"
                                            defaultValue={data.User.avatarUrl}
                                          />
                                        </div>
                                        <Button color="primary" type="submit">
                                          Update Profile
                                        </Button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                              </>
                            )}
                          </Mutation>
                        );
                      }}
                    </Query>
                  </Grid>
                </div>
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <Query
              query={GET_USERS}
              variables={{ Id: this.props.auth.user.id }}
            >
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                return (
                  <ProfileCard
                    avatar={data.User.avatarUrl}
                    picture={<ReactUpload />}
                    subtitle={data.User.status}
                    title={data.User.name}
                    // tslint:disable-next-line:max-line-length
                    description={data.User.email}
                    footer={
                      <div>
                        <Button color="primary" round>
                          Recommend
                        </Button>
                      </div>
                    }
                  />
                );
              }}
            </Query>
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserProfile);
