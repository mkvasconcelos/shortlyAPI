import RankingRepository from "../repositories/rankingRepository.js";
const rankingRepository = new RankingRepository();

export async function rankingRead(_, res) {
  try {
    const topRankedUsers = await rankingRepository.getTopRankedUsers();
    return res.status(200).send(topRankedUsers);
  } catch (err) {
    return res.status(500).send(err);
  }
}
