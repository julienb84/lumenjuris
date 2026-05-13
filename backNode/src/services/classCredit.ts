import { prisma } from "../../prisma/singletonPrisma";
import { SubscriptionStatus } from "../../prisma/generated/enums";
import { StringWithAggregatesFilter } from "../generated/commonInputTypes";

type ReturnData<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

export class Credit {
  async addCredit(
    userId: number,
    addSignatureCredit?: number,
    addAnalyzeCredit?: number,
    addGenerationCredit?: number,
  ): Promise<ReturnData> {
    try {
      const user = await prisma.user.findUnique({ where: { idUser: userId } });
      if (!user)
        return { success: false, message: "Utilisateur introuvable !" };

      // On vérifie que l'utilisateur ai bien un abonnement actif pour pouvoir ajouter des crédits
      const activeSubscription = await prisma.subscription.findUnique({
        where: { userId },
        select: { status: true },
      });
      if (
        !activeSubscription ||
        activeSubscription.status !== SubscriptionStatus.ACTIVE
      )
        return { success: false, message: "Aucun abonnement actif !" };

      const data: any = {};
      if (addSignatureCredit)
        data.creditSignature = { increment: addSignatureCredit };

      if (addAnalyzeCredit)
        data.creditAnalyse = { increment: addAnalyzeCredit };

      if (addGenerationCredit)
        data.creditGenerationDoc = { increment: addGenerationCredit };

      const addedCredits = await prisma.userCredit.update({
        where: { userId },
        data,
      });

      return {
        success: true,
        message: "Les nouveaux crédits ont bien été ajoutés.",
        data: {
          creditSignature: addedCredits.creditSignature,
          creditAnalyse: addedCredits.creditAnalyse,
          creditGeneration: addedCredits.creditGenerationDoc,
        },
      };
    } catch (error) {
      console.error("ADD CREDIT ERROR:", error);
      return {
        success: false,
        message: "Erreur lors de l'ajout des crédits.",
      };
    }
  }

  async removeCredit(
    userId: number,
    removeSignatureCredit?: number,
    removeAnalyzeCredit?: number,
    removeGenerationCredit?: number,
  ): Promise<ReturnData> {
    try {
      const user = await prisma.user.findUnique({ where: { idUser: userId } });
      if (!user)
        return { success: false, message: "Utilisateur introuvable !" };

      // On vérifie que l'utilisateur ai bien un abonnement actif avec des crédits restants
      const activeSubscription = await prisma.subscription.findUnique({
        where: { userId },
        select: { status: true },
      });
      if (
        !activeSubscription ||
        activeSubscription.status !== SubscriptionStatus.ACTIVE
      )
        return { success: false, message: "Aucun abonnement actif !" };

      const remainingCredits = await prisma.userCredit.findUnique({
        where: { userId },
      });
      if (!remainingCredits)
        return {
          success: false,
          message: "Vous ne semblez pas avoir de crédits.",
        };
      if (
        remainingCredits.creditAnalyse === 0 &&
        remainingCredits.creditGenerationDoc === 0 &&
        remainingCredits.creditSignature === 0
      )
        return { success: false, message: "Tous vos crédits sont épuisés !" };

      // On retire les crédits s'il en reste
      if (
        removeSignatureCredit &&
        remainingCredits.creditSignature >= removeSignatureCredit
      ) {
        const signatureCreditsRemoved = await prisma.userCredit.update({
          where: { userId },
          data: { creditSignature: { decrement: removeSignatureCredit } },
        });
        return {
          success: true,
          message: "Crédits Signature retirés.",
          data: signatureCreditsRemoved.creditSignature,
        };
      }
      if (
        removeAnalyzeCredit &&
        remainingCredits?.creditAnalyse >= removeAnalyzeCredit
      ) {
        const analyzeCReditsRemove = await prisma.userCredit.update({
          where: { userId },
          data: { creditAnalyse: { decrement: removeAnalyzeCredit } },
        });
        return {
          success: true,
          message: "Crédits Analyse retirés.",
          data: analyzeCReditsRemove,
        };
      }
      if (
        removeGenerationCredit &&
        remainingCredits.creditGenerationDoc >= removeGenerationCredit
      ) {
        const generationCreditsRemove = await prisma.userCredit.update({
          where: { userId },
          data: { creditGenerationDoc: { decrement: removeGenerationCredit } },
        });
        return {
          success: true,
          message: "Crédits Generation de doc retirés.",
          data: generationCreditsRemove.creditGenerationDoc,
        };
      }

      return {
        success: false,
        message: "Crédits insuffisants !",
        data: remainingCredits.creditSignature,
      };
    } catch (error) {
      console.error("REMOVE CREDIT ERROR:", error);
      return {
        success: false,
        message: "Erreur lors du retrait de crédits.",
      };
    }
  }
}
