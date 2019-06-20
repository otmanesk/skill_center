module.exports = `
type User {
  id: String
  name: String
  username : String
  password : String
  status: String
  agency: String
  gender: String
  birthday: String
  email :  String
  availability : String
  phone : String
  address : String
  avatarUrl : String
  trainings : [ Training ]
  projects:[Project]
  education : [Education]
  skills : [Skill]
  trainingsFollowed:[ Training ]

}

type Training{
      id: String
      name: String
      type: String
      site: String
      endDate: String
      rank: String
      startDate: String
      former: String
      
}

input  TrainingInput{
  id: String
  name: String
  type: String
  site: String
  endDate: String
  rank: String
  startDate: String
  former: String
}

type Project{
  id: String
  name: String
  description: String
  technology: String
  society: String
  size: String
  site: String
  startDate: String
  endDate: String
  status: String
  progress: String
}
input  ProjectInput{
  id: String
  name: String
  description: String
  technology: String
  society: String
  size: String
  site: String
  startDate: String
  endDate: String
  status: String
  progress: String
}
type Skill{
  id: String,
  name : String,
  value : String
}
input SkillInput{
  id: String,
  name: String,
  value: String
}
type Education{
  id: String,
  school: String,
  diploma: String,
  university: String,
  trainings: String,
  certification : String
}
input EducationInput{

  id: String,
  school: String,
  diploma: String,
  university: String,
  trainings: String,
  certification : String
}

type Query {
  allUsers: [User!]!
  User(id :String):User
}
type Mutation {
  createUser(name: String!): User!
  updateUser(id:String!,
    name: String!,
    username : String!,
    status: String!,
    agency: String!,
    gender: String!,
    birthday: String!,
    email :  String!,
    availability : String!,
    phone : String!,
    address : String!
    ):User!

  addTraining( 
    id:String!, 
    name: String,
    username : String,
    status: String,
    agency: String,
    gender: String,
    birthday: String,
    email :  String,
    trainings : [TrainingInput]):User!
    
    updateTraining(id:String!, trainings:[TrainingInput]):User!

    
    deleteTraining(id:String!, trainings:[TrainingInput]):User!

    addTrainingFollowed( 
      id:String!, 
      name: String,
      username : String,
      status: String,
      agency: String,
      gender: String,
      birthday: String,
      email :  String,
      trainingsFollowed : [TrainingInput]):User!

      deleteTrainingFollowed(id:String!, trainingsFollowed:[TrainingInput]):User!

    
    addProject( 
      id:String!, 
      name: String,
      username : String,
      status: String,
      agency: String,
      gender: String,
      birthday: String,
      email :  String,
      projects : [ProjectInput]):User!
      
      updateProject(id:String!, projects:[ProjectInput]):User!

    
      deleteProject(id:String!, projects:[ProjectInput]):User!
    addEducation(
      id: String,
      school: String,
      diploma: String,
      university: String,
      trainings: String,
      certification : String,
      education : [EducationInput]):User!

      updateEducation(id:String!, education:[EducationInput]):User!

      deleteEducation(id:String!, education:[EducationInput]):User!

    addSkill(
      id: String,
      name: String,
      value: String,
      skills:[SkillInput]):User!,
      updateSkill(id:String!,skills:[SkillInput]):User!,
      deleteSkill(id:String!,skills:[SkillInput]):User!
        
  }
`;
