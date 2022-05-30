import { default as semver, ReleaseType } from "semver";

const { diff, prerelease, valid } = semver;

/**
 * Filter versions by release type.
 */
export const getReleasesByType = (
  versions: string[],
  type: ReleaseType,
): string[] =>
  versions.filter(
    (value: string, index: number, array: string[]) =>
      diff(array[index - 1] ?? value, value) === type,
  );

/**
 * Filter out "time" metadata about the package.
 */
export const getSanitisedReleases = (
  releases: Map<string, string>,
): Map<string, string> =>
  new Map(
    Array.from(releases.entries()).filter(([version, _]) => valid(version)),
  );

/**
 * Filter pre-release versions.
 */
export const getStableReleases = (
  releases: Map<string, string>,
): Map<string, string> =>
  new Map(
    Array.from(releases.entries()).filter(
      ([version, _]) => prerelease(version) == null,
    ),
  );
