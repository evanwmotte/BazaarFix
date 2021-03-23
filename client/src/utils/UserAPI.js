import axios from "axios";

export default {

   /// saves a user 
    saveUser: function(userData) {
      console.log("running")
      return axios.post("/api/users", userData);
    },
      // Gets all users
      getUsers: function() {
        return axios.get("/api/users/");
      },
      
      // Gets the user with the given id

      // getUser: function(id) {
      //   return axios.get("/api/users/" + id);
      // },

      // Deletes the user with the given id
      deleteUser: function(id) {
        return axios.delete("/api/users" + id);
      },
      updateUser: function(query) {
        return axios.put("/api/users", query)
      },
      getUser: function() {
        return axios.get("/api/users")
      }
};