import Product from "../models/product.model.js";

export async function renderHome(req, res) {
  try {
    const { limit = 10, page = 1 } = req.query;
    const data = await Product.paginate({}, { limit, page, lean: true });
    const products = data.docs;
    delete data.docs;

    const links = [];

    for (let index = 1; index <= data.totalPages; index++) {
      links.push({ text: index, link: `?limit=${limit}&page=${index}` });
    }

    // Links anterior y siguiente
    const prevLink = data.hasPrevPage
      ? `?limit=${limit}&page=${data.prevPage}`
      : null;

    const nextLink = data.hasNextPage
      ? `?limit=${limit}&page=${data.nextPage}`
      : null;

    res.render("home", { products, links, prevLink, nextLink });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function renderAdmin(req, res) {
  try {
    res.render("admin.handlebars");
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener la vista",
    });
  }
}

export async function renderLogin(req, res) {
  try {
    res.render("login.handlebars");
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener la vista",
    });
  }
}

export async function renderLoginFailure(req, res) {
  try {
    res.render("login-failure.handlebars", {
      message: "No se encontró el usuario solicitado",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener la vista",
    });
  }
}

export async function renderRegister(req, res) {
  try {
    res.render("register.handlebars");
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener la vista",
    });
  }
}

export async function renderFailureRegister(req, res) {
  try {
    res.render("failure-register.handlebars", {
      message: "Ocurrió un error al intentar el registro",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener la vista",
    });
  }
}

export async function renderProfile(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }
  const { first_name, last_name, age, email, role } = req.user;
  try {
    res.render("profile.handlebars", {
      first_name,
      last_name,
      age,
      email,
      role,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener la vista",
    });
  }
}

export async function renderForgotPassword(req, res) {
  try {
    res.render("forgot-password.handlebars");
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener la vista",
    });
  }
}

export async function renderResetPassword(req, res) {
  try {
    const { token } = req.query;
    res.render("reset-password.handlebars", { token });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "No se pudo obtener la vista",
    });
  }
}
