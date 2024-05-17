
import HomePage from "../pages/HomePage";
import HomeLayout from "../layout/HomeLayout";
import { Navigate, createBrowserRouter } from "react-router-dom";
import LibraryPage from "../pages/LibraryPage";
import AddSongs from "../pages/AddNewSongs";
import PlaylistsPage from "../pages/PlaylistsPage";
import CreatePlaylistPage from "../pages/CreatePlaylistPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserLayout from "../layout/UserLayout";
import ArtistesPage from "../pages/ArtistesPage";
import ArtistePage from "../pages/ArtistePage";
import FavoritesPage from "../pages/FavoritesPage";
import PlaylistPage from "../pages/PlaylistPage"
import EditPlaylistPage from "../pages/EditPlaylistPage";


export const router = createBrowserRouter([

  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true, element: <Navigate to="/home" replace />
      },
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/library",
        element: <LibraryPage />
      },
      {
        path: "/playlists",
        element: <PlaylistsPage />
      },
      {
        path: "/addSongs",
        element: <AddSongs />
      },
      {
        path: "playlist/createPlaylist",
        element: <CreatePlaylistPage />
      },
      {
        path: "playlists",
        element: <PlaylistsPage />,
      },
      {
        path: "playlists/:id",
        element: <PlaylistPage />,
      },
      {
        path: "playlists/edit/:id",
        element: <EditPlaylistPage />,
      },
      {
        path: "artistes",
        element: <ArtistesPage />,
      },
      {
        path: "artiste/:id",
        element: <ArtistePage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "/user/login",
        element: <LoginPage />,
      },
      {
        path: "/user/register",
        element: <RegisterPage />,
      }
    ]
  }
]);


