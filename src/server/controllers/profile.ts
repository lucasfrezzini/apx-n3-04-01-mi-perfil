export class ProfileController {
  async uploadProfilePic(dataURI: string) {
    // Upload the profile picture to the cloud
    // Return the URL of the uploaded image

    return "https://example.com/profile.jpg";
  }

  public static async getProfile() {
    return "Get Profile page";
  }

  public static async postProfile() {
    return "Post Profile page";
  }
}
