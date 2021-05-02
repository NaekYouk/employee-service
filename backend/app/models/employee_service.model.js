module.exports = (sequelize, Sequelize) => {
  const EmployeeService = sequelize.define("employee_service", {
    id: {
      primaryKey: true,
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    patronymic: {
      type: Sequelize.STRING
    },
    sex: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    room: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    employment_date: {
      type: Sequelize.DATE
    },
  });

  return EmployeeService;
};
