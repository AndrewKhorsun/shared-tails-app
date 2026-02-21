import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Card, CardBody } from "../components/ui/Card";
import "./ProfilePage.css";

export function ProfilePage(): ReactNode {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="profile-page">
        <h1>Profile</h1>
        <Card className="profile-card">
          <CardBody>
            <div className="profile-avatar">
              <span>{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className="profile-username">{user.username}</h2>
            <p className="profile-info">
              Member since {user.created_at
                ? new Date(user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
