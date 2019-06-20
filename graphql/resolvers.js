module.exports = {
  Query: {
    allUsers: async () => {
      const users = await User.find();

      return users.map(x => x);
    },
    User: (parent, args) => {
      const user = User.findById(args.id);
      if (!user) {
        console.log("error");
      }
      return user;
    }
  },
  Mutation: {
    createUser: async (parent, args, { User }) => {
      const user = await new User(args).save();
      return user;
    },
    updateUser: (root, params) => {
      return User.findOneAndUpdate(
        params.id,
        {
          name: params.name,
          username: params.username,
          status: params.status,
          agency: params.agency,
          gender: params.gender,
          birthday: params.birthday,
          email: params.email,
          avatarUrl: params.avatarUrl,
          phone: params.phone,
          address: params.address,
          availability: params.availability
        },
        function(err) {
          if (err) return next(err);
        }
      );
    },
    addTraining: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });

      const a = JSON.parse(JSON.stringify(args));
      user.trainings.push({
        name: a.trainings[0].name,
        type: a.trainings[0].type,
        site: a.trainings[0].site,
        rank: a.trainings[0].rank,
        former: a.trainings[0].former,
        startDate: a.trainings[0].startDate,
        endDate: a.trainings[0].endDate
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    deleteTraining: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists = user.trainings.filter(x => {
        return x.id != a.trainings[0].id;
      });
      return User.findOneAndUpdate(args.id, { trainings: lists }, function(
        err
      ) {
        if (err) return next(err);
      });
    },
    updateTraining: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });

      const a = JSON.parse(JSON.stringify(args));

      user.trainings.map(x => {
        if (x.id == a.trainings[0].id) {
          x.name = a.trainings[0].name;
          x.type = a.trainings[0].type;
          x.site = a.trainings[0].site;
          x.rank = a.trainings[0].rank;
          x.former = a.trainings[0].former;
          x.startDate = a.trainings[0].startDate;
          x.endDate = a.trainings[0].endDate;
        }
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    addProject: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.projects.push({
        name: a.projects[0].name,
        description: a.projects[0].description,
        technology: a.projects[0].technology,
        society: a.projects[0].society,
        size: a.projects[0].size,
        site: a.projects[0].site,
        endDate: a.projects[0].endDate,
        startDate: a.projects[0].startDate,
        status: a.projects[0].status,
        progress: a.projects[0].progress
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    deleteProject: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists = user.projects.filter(x => {
        return x.id != a.projects[0].id;
      });
      return User.findOneAndUpdate(args.id, { projects: lists }, function(err) {
        if (err) return next(err);
      });
    },
    updateProject: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });

      const a = JSON.parse(JSON.stringify(args));

      user.projects.map(x => {
        if (x.id == a.projects[0].id) {
          x.name = a.projects[0].name;
          x.description = a.projects[0].description;
          x.site = a.projects[0].site;
          x.technology = a.projects[0].technology;
          x.society = a.projects[0].society;
          x.size = a.projects[0].size;
          x.endDate = a.projects[0].endDate;
          x.startDate = a.projects[0].startDate;
          x.status = a.projects[0].status;
          x.progress = a.projects[0].progress;
        }
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    addTrainingFollowed: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.trainingsFollowed.push({
        name: a.trainingsFollowed[0].name,
        type: a.trainingsFollowed[0].Type,
        site: a.trainingsFollowed[0].Site,
        rank: a.trainingsFollowed[0].Rank,
        former: a.trainingsFollowed[0].former,
        startDate: a.trainingsFollowed[0].startDate,
        endDate: a.trainingsFollowed[0].EndDate
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    deleteTrainingFollowed: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists = user.trainingsFollowed.filter(x => {
        return x.id != a.trainingsFollowed[0].id;
      });
      return User.findOneAndUpdate(
        args.id,
        { trainingsFollowed: lists },
        function(err) {
          if (err) return next(err);
        }
      );
    },
    addEducation: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.education.push({
        school: a.education[0].school,
        diploma: a.education[0].diploma,
        university: a.education[0].university,
        certification: a.education[0].certification,
        trainings: a.education[0].trainings
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    deleteEducation: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists = user.education.filter(x => {
        return x.id != a.education[0].id;
      });
      return User.findOneAndUpdate(args.id, { education: lists }, function(
        err
      ) {
        if (err) return next(err);
      });
    },
    updateEducation: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));

      user.education.map(x => {
        if (x.id == a.education[0].id) {
          x.school = a.education[0].school;
          x.university = a.education[0].university;
          x.diploma = a.education[0].diploma;
          x.trainings = a.education[0].trainings;
          x.education = a.education[0].certification;
        }
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    addSkill: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      user.skills.push({
        name: a.skills[0].name,
        value: a.skills[0].value
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    },
    deleteSkill: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));
      var lists = user.skills.filter(x => {
        return x.id != a.skills[0].id;
      });
      return User.findOneAndUpdate(args.id, { skills: lists }, function(err) {
        if (err) return next(err);
      });
    },
    updateSkill: async (parent, args, { User }) => {
      var user;
      await User.findById(args.id, function(err, pro) {
        user = pro;
      });
      const a = JSON.parse(JSON.stringify(args));

      user.skills.map(x => {
        if (x.id == a.skills[0].id) {
          x.name = a.skills[0].name;
          x.value = a.skills[0].value;
        }
      });
      return User.findOneAndUpdate(args.id, user, function(err) {
        if (err) return next(err);
      });
    }
  }
};
