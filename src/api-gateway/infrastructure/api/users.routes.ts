import axios, { AxiosError } from "axios";
import express from "express";
import jwt from "jsonwebtoken";

import { apiGatewayManagement } from "../dependecies";

const usersRoutes = express.Router();
const usersServiceUrl = "http://localhost:3000";

usersRoutes.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`${usersServiceUrl}/users`);
    res.json(response.data.data);
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

usersRoutes.get("/users/id-types", async (req, res) => {
  try {
    const response = await axios.get(`${usersServiceUrl}/users/id-types`);
    res.json(response.data.data);
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

usersRoutes.post("/users/add", async (req, res) => {
  try {
    const response = await axios.post(`${usersServiceUrl}/users/add`, req.body);
    res.json(response.data.data);
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

usersRoutes.post("/users/add-id-type", async (req, res) => {
  try {
    const response = await axios.post(
      `${usersServiceUrl}/users/add-id-type`,
      req.body
    );
    res.json(response.data.data);
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

usersRoutes.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(
      `${usersServiceUrl}/users/${id}`,
      req.body
    );
    res.json(response.data.data);
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

usersRoutes.put("/users/edit-id-type/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(
      `${usersServiceUrl}/users/edit-id-type/${id}`,
      req.body
    );
    res.json(response.data.data);
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

usersRoutes.post("/users/authentication", async (req, res) => {
  try {
    const response: any = await axios.post(
      `${usersServiceUrl}/users/authentication`,
      req.body
    );
    if (response.data.data != null) {
      return res.json(
        await apiGatewayManagement.createTokens(response.data.data.id!)
      );
    }

    res.json({ error: "datos de inicio de sesión incorrectos." });
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

usersRoutes.post("/users/authentication/refresh", async (req, res) => {
  try {
    const { refresh_token } = req.body;
    return res.json(
      await apiGatewayManagement.refreshToken(refresh_token)
    );
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

usersRoutes.post("/users/authentication/logout", async (req, res) => {
  try {
    const { token, refresh_token } = req.body;
    return res.json(
      await apiGatewayManagement.invalidateToken(token, refresh_token)
    );
  } catch (error: any) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
});

export default usersRoutes;
