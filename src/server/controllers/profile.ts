import { v2 as cloudinary } from "cloudinary";
import { Profile } from "../models/profile";

interface Profile {
  name: string;
  bio: string;
  imgURL: string;
}

export class ProfileController {
  static async uploadProfilePic(dataURI: string) {
    // Upload the profile picture to the cloud
    // Return the URL of the uploaded image
    // Configuration
    cloudinary.config({
      cloud_name: "dhwquhtqs",
      api_key: "378212214582136",
      api_secret: "2-2oduklbKliC2S7ZXZVJlsPBps", // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(dataURI)
      .catch((error) => {
        console.log(error);
      });
    return uploadResult;
  }

  static validateProfile(profile: Profile) {
    // Validate the profile data
    // Return true if the profile is valid
    // Return false if the profile is invalid
    console.log(profile.name.length);
    console.log(profile.bio.length);
    console.log(profile.imgURL.length);

    if (
      profile.name.length > 0 &&
      profile.bio.length > 0 &&
      profile.imgURL.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  public static async getProfile(id: string) {
    console.log(id);
    // Get the profile data from the database
    const profile = await Profile.findOne({ where: { id: id } });
    if (!profile) {
      return new Error("Profile not found");
    }
    return profile;
  }

  public static async postProfile(profile: Profile) {
    console.log(profile);

    if (!ProfileController.validateProfile(profile)) {
      return new Error("Invalid profile data");
    }
    // Save the imgURL in cloudinary
    const uploadResult = await ProfileController.uploadProfilePic(
      profile.imgURL
    );
    if (!uploadResult || !uploadResult.url) {
      return new Error("Failed to upload image");
    }

    // Save the profile data in the database
    const [profileData, created] = await Profile.findOrCreate({
      where: { name: profile.name, bio: profile.bio, imgURL: profile.imgURL },
      defaults: {
        name: profile.name,
        bio: profile.bio,
        imgURL: uploadResult.url,
      },
    });

    if (!created) {
      return new Error("Profile already exists");
    }

    return profileData;
  }
}
