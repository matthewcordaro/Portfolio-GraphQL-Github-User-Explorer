import { Repository } from "./types"

/**
 * Calculates the top 5 most forked repositories from a given list.
 *
 * @param repositories - An array of `Repository` objects to analyze.
 * @returns An array of objects containing the repository name (`repo`) and its fork count (`count`), sorted in descending order by fork count. Returns an empty array if the input is empty.
 */
export const calculateMostForkedRepos = (
  repositories: Repository[]
): { repo: string; count: number }[] => {
  if (repositories.length === 0) return []
  return repositories
    .filter((repo) => repo.forkCount > 0)
    .map((repo) => ({
      repo: repo.name,
      count: repo.forkCount,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

/**
 * Calculates the top 5 most starred repositories from a given list.
 *
 * @param repositories - An array of `Repository` objects to evaluate.
 * @returns An array of up to 5 objects, each containing the repository name (`repo`) and its star count (`stars`), sorted in descending order by stars.
 */
export const calculateMostStarredRepos = (
  repositories: Repository[]
): { repo: string; stars: number }[] => {
  if (repositories.length === 0) return []
  return repositories
    .filter((repo) => repo.stargazerCount > 0)
    .map((repo) => ({
      repo: repo.name,
      stars: repo.stargazerCount,
    }))
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5)
}

/**
 * Calculates the most popular programming languages used across a list of repositories.
 *
 * Iterates through the provided repositories, counts the occurrences of each language,
 * and returns an array of up to the top 5 languages sorted by their frequency in descending order.
 *
 * @param repositories - An array of Repository objects, each containing language information.
 * @returns An array of objects, each with a `language` string and a `count` number, representing the most popular languages.
 */
export const calculatePopularLanguages = (
  repositories: Repository[]
): { language: string; count: number }[] => {
  if (repositories.length === 0) return []

  const languageMap: { [key: string]: number } = {}

  // Count
  repositories.forEach((repo) => {
    if (repo.languages.edges.length === 0) return
    repo.languages.edges.forEach((language) => {
      const { name } = language.node
      languageMap[name] = (languageMap[name] || 0) + 1
    })
  })

  // No languages found
  if (Object.keys(languageMap).length === 0) return []

  // Sort, take top 5, and format
  return Object.entries(languageMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, count]) => ({ language, count }))
}
