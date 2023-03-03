import { nanoid } from "nanoid";
import UrlsRepository from "../repositories/urlsRepository.js";
const urlsRepository = new UrlsRepository();

export async function urlsCreate(_, res) {
  const { userId, url } = res.locals;
  const shortUrl = nanoid();
  try {
    await urlsRepository.insertUrl(url, shortUrl, userId);
    const response = await urlsRepository.getUrl(url, shortUrl, userId);
    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function urlIdRead(_, res) {
  const { array } = res.locals;
  try {
    delete array.userId;
    return res.status(200).send(array);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function urlIdDelete(_, res) {
  const { userId, userOwner, urlId } = res.locals;
  try {
    if (userId !== userOwner) {
      return res.sendStatus(401);
    }
    await urlsRepository.deleteUrl(urlId);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function urlOpen(_, res) {
  const { urlId, url, accesses } = res.locals;
  try {
    await urlsRepository.updateAccessesUrl(urlId, accesses);
    return res.status(200).redirect(url);
  } catch (err) {
    return res.status(500).send(err);
  }
}
