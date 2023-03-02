import UserRepository from "../repositories/userRepository.js";
const userRepository = new UserRepository();

export async function userRead(_, res) {
  const { userId } = res.locals;
  try {
    const response = await userRepository.getUserWithUrls(userId);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
}
