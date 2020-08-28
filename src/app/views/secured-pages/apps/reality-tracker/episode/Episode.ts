export class Episode {
  public episodeGuid?: string;
  public episodeName?: string;
  public episodeDate?: string;
  public episodeNumberInSeason?: number;
  public episodeNumberInSeries?: number;
  public episodeComments?: string;
  // Season
  public seasonGuid?: string;
  public seasonName?: string;
  public seasonAbbreviation?: string;
  // Series
  public seriesGuid?: string;
  public seriesName?: string;
  public seriesAbbreviation?: string;
}
