import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesListComponent } from './series/series-list/series-list.component';
import { ContestantListComponent } from './contestant/contestant-list/contestant-list.component';
import { ContestantDetailComponent } from './contestant/contestant-detail/contestant-detail.component';
import { ContestantDetailEditComponent } from './contestant/contestant-detail-edit/contestant-detail-edit.component';
import { SeriesDetailComponent } from './series/series-detail/series-detail.component';
import { SeriesDetailEditComponent } from './series/series-detail-edit/series-detail-edit.component';
import { SeasonDetailComponent } from './season/season-detail/season-detail.component';
import { SeasonDetailEditComponent } from './season/season-detail-edit/season-detail-edit.component';
import { PlayerDetailComponent } from './player/player-detail/player-detail.component';
import { PlayerDetailEditComponent } from './player/player-detail-edit/player-detail-edit.component';
import { EpisodeDetailComponent } from './episode/episode-detail/episode-detail.component';
import { EpisodeDetailEditComponent } from './episode/episode-detail-edit/episode-detail-edit.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reality Tracker'
    },
    children: [
      {
        path: '',
        redirectTo: 'series-list',
        pathMatch: 'full'
      },

      // DASHBOARDS

      {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        data: {
          title: 'User Dashboard'
        }
      },

      // SERIES

      {
        path: 'series-list',
        component: SeriesListComponent,
        data: {
          title: 'Series List'
        }
      },
      {
        path: 'series-detail/:guid',
        component: SeriesDetailComponent,
        data: {
          title: 'Series Detail'
        }
      },
      {
        path: 'series-detail-edit/:guid',
        component: SeriesDetailEditComponent,
        data: {
          title: 'Edit Series'
        }
      },
      {
        path: 'series-create',
        component: SeriesDetailEditComponent,
        data: {
          title: 'Create Series'
        }
      },

      // SEASON

      {
        path: 'season-detail/:guid',
        component: SeasonDetailComponent,
        data: {
          title: 'Season Detail'
        }
      },
      {
        path: 'season-detail-edit/:guid',
        component: SeasonDetailEditComponent,
        data: {
          title: 'Edit Season'
        }
      },

      // EPISODE

      {
        path: 'episode-detail/:guid',
        component: EpisodeDetailComponent,
        data: {
          title: 'Episode Detail'
        }
      },
      {
        path: 'episode-detail-edit/:guid',
        component: EpisodeDetailEditComponent,
        data: {
          title: 'Edit Episode'
        }
      },

      // CONTESTANT

      {
        path: 'contestant-list',
        component: ContestantListComponent,
        data: {
          title: 'Contestant List'
        }
      },
      {
        path: 'contestant-detail/:guid',
        component: ContestantDetailComponent,
        data: {
          title: 'Contestant Detail'
        }
      },
      {
        path: 'contestant-detail-edit/:guid',
        component: ContestantDetailEditComponent,
        data: {
          title: 'Edit Contestant'
        }
      },
      {
        path: 'contestant-create',
        component: ContestantDetailEditComponent,
        data: {
          title: 'Create Contestant'
        }
      },

      // PLAYER

      {
        path: 'player-detail/:guid',
        component: PlayerDetailComponent,
        data: {
          title: 'Player Detail'
        }
      },
      {
        path: 'player-detail-edit/:guid',
        component: PlayerDetailEditComponent,
        data: {
          title: 'Edit Player'
        }
      },
      {
        path: 'player-create',
        component: PlayerDetailEditComponent,
        data: {
          title: 'Create Player'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealityTrackerRoutingModule {
}
